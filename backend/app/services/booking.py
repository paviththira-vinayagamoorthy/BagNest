from datetime import datetime
from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.booking import Booking
from app.models.storage import StorageLocation


ACTIVE_BOOKING_STATUSES = {
    "CONFIRMED",
    "CHECKED_IN",
}


def generate_reference_code() -> str:
    """
    Generate a unique booking reference.
    Example: BS-8F3A21
    """

    return f"BS-{uuid4().hex[:6].upper()}"


def validate_booking_time(
    start_time: datetime,
    end_time: datetime,
    storage: StorageLocation,
):
    """
    Validate booking date and opening hours.
    """

    if start_time >= end_time:
        raise ValueError(
            "End time must be after start time"
        )

    if start_time.date() != end_time.date():
        raise ValueError(
            "Booking must start and end on the same date"
        )

    booking_start_time = start_time.time()
    booking_end_time = end_time.time()

    if booking_start_time < storage.opening_time:
        raise ValueError(
            "Booking starts before storage opening time"
        )

    if booking_end_time > storage.closing_time:
        raise ValueError(
            "Booking ends after storage closing time"
        )


def calculate_max_occupied_bags(
    existing_bookings: list[Booking],
    requested_start: datetime,
    requested_end: datetime,
) -> int:
    """
    Calculate the maximum number of bags occupied
    at any point during the requested booking period.
    """

    events = []

    for booking in existing_bookings:

        overlap_start = max(
            booking.start_time,
            requested_start,
        )

        overlap_end = min(
            booking.end_time,
            requested_end,
        )

        if overlap_start < overlap_end:

            events.append(
                (
                    overlap_start,
                    booking.bags_count,
                    "start",
                )
            )

            events.append(
                (
                    overlap_end,
                    booking.bags_count,
                    "end",
                )
            )

    # Add requested booking events.
    events.append(
        (
            requested_start,
            0,
            "requested_start",
        )
    )

    events.append(
        (
            requested_end,
            0,
            "requested_end",
        )
    )

    # End events must be processed before start events
    # when timestamps are the same.
    events.sort(
        key=lambda event: (
            event[0],
            0 if event[2] == "end" else 1,
        )
    )

    current_occupied = 0
    max_occupied = 0

    for event_time, bags, event_type in events:

        if event_type == "end":
            current_occupied -= bags

        elif event_type == "start":
            current_occupied += bags

        max_occupied = max(
            max_occupied,
            current_occupied,
        )

    return max_occupied


def create_booking(
    db: Session,
    traveller_id: int,
    storage_id: int,
    bags_count: int,
    start_time: datetime,
    end_time: datetime,
):
    """
    Create a booking only if enough storage capacity exists.
    """

    # Lock the storage row during booking creation.
    # This helps prevent concurrent overbooking.
    storage = db.scalar(
        select(StorageLocation)
        .where(
            StorageLocation.id == storage_id
        )
        .with_for_update()
    )

    if not storage:
        raise LookupError(
            "Storage location not found"
        )

    if not storage.active:
        raise ValueError(
            "This storage location is not active"
        )

    validate_booking_time(
        start_time=start_time,
        end_time=end_time,
        storage=storage,
    )

    # Find bookings that overlap the requested period.
    overlapping_bookings = db.scalars(
        select(Booking)
        .where(
            Booking.storage_id == storage_id,

            Booking.status.in_(
                ACTIVE_BOOKING_STATUSES
            ),

            Booking.start_time < end_time,

            Booking.end_time > start_time,
        )
    ).all()

    max_occupied = calculate_max_occupied_bags(
        existing_bookings=overlapping_bookings,
        requested_start=start_time,
        requested_end=end_time,
    )

    available_capacity = (
        storage.capacity - max_occupied
    )

    if bags_count > available_capacity:

        raise OverflowError(
            f"Not enough capacity. "
            f"Available capacity: {available_capacity}, "
            f"requested bags: {bags_count}"
        )

    # Price calculation.
    # MVP rule:
    # price per bag × number of bags
    total_price = (
        storage.price_per_bag * bags_count
    )

    reference_code = generate_reference_code()

    # Make sure reference code is unique.
    while db.scalar(
        select(Booking).where(
            Booking.reference_code
            == reference_code
        )
    ):
        reference_code = generate_reference_code()

    booking = Booking(
        reference_code=reference_code,
        traveller_id=traveller_id,
        storage_id=storage_id,
        bags_count=bags_count,
        start_time=start_time,
        end_time=end_time,
        total_price=total_price,
        status="CONFIRMED",
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking


def get_my_bookings(
    db: Session,
    traveller_id: int,
):
    """
    Return bookings belonging to the current traveller.
    """

    query = (
        select(Booking)
        .where(
            Booking.traveller_id
            == traveller_id
        )
        .order_by(
            Booking.created_at.desc()
        )
    )

    return db.scalars(query).all()


def get_booking_by_id(
    db: Session,
    booking_id: int,
):
    return db.get(
        Booking,
        booking_id,
    )


def cancel_booking(
    db: Session,
    booking: Booking,
):
    """
    Cancel a booking.

    Only CONFIRMED bookings can be cancelled.
    """

    if booking.status != "CONFIRMED":
        raise ValueError(
            "Only confirmed bookings can be cancelled"
        )

    booking.status = "CANCELLED"

    db.commit()
    db.refresh(booking)

    return booking