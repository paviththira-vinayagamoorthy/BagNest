from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.booking import Booking
from app.models.checkin import CheckInCheckout
from app.models.storage import StorageLocation


def get_booking_for_checkin(
    db: Session,
    booking_id: int,
):
    return db.scalar(
        select(Booking)
        .where(
            Booking.id == booking_id
        )
    )


def verify_partner_owns_booking(
    booking: Booking,
    current_user,
    db: Session,
):
    storage = db.get(
        StorageLocation,
        booking.storage_id,
    )

    if not storage:
        raise LookupError(
            "Storage location not found"
        )

    if (
        current_user.role != "admin"
        and storage.partner_id != current_user.id
    ):
        raise PermissionError(
            "You can only manage bookings for your own storage"
        )

    return storage


def check_in_booking(
    db: Session,
    booking: Booking,
    current_user,
):
    """
    Check a traveller into the storage.
    """

    verify_partner_owns_booking(
        booking=booking,
        current_user=current_user,
        db=db,
    )

    if booking.status == "CANCELLED":
        raise ValueError(
            "Cancelled booking cannot be checked in"
        )

    if booking.status == "CHECKED_OUT":
        raise ValueError(
            "Booking has already been checked out"
        )

    if booking.status == "CHECKED_IN":
        raise ValueError(
            "Booking is already checked in"
        )

    if booking.status != "CONFIRMED":
        raise ValueError(
            "Only confirmed bookings can be checked in"
        )

    checkin_record = db.scalar(
        select(CheckInCheckout)
        .where(
            CheckInCheckout.booking_id
            == booking.id
        )
    )

    if checkin_record:
        raise ValueError(
            "Check-in record already exists"
        )

    now = datetime.utcnow()

    checkin_record = CheckInCheckout(
        booking_id=booking.id,
        check_in_time=now,
        check_out_time=None,
        status="CHECKED_IN",
    )

    booking.status = "CHECKED_IN"

    db.add(checkin_record)
    db.commit()

    db.refresh(booking)
    db.refresh(checkin_record)

    return booking, checkin_record


def check_out_booking(
    db: Session,
    booking: Booking,
    current_user,
):
    """
    Check a traveller out of the storage.
    """

    verify_partner_owns_booking(
        booking=booking,
        current_user=current_user,
        db=db,
    )

    if booking.status == "CANCELLED":
        raise ValueError(
            "Cancelled booking cannot be checked out"
        )

    if booking.status == "CHECKED_OUT":
        raise ValueError(
            "Booking has already been checked out"
        )

    if booking.status != "CHECKED_IN":
        raise ValueError(
            "Booking must be checked in before checkout"
        )

    checkin_record = db.scalar(
        select(CheckInCheckout)
        .where(
            CheckInCheckout.booking_id
            == booking.id
        )
    )

    if not checkin_record:
        raise ValueError(
            "Check-in record not found"
        )

    if not checkin_record.check_in_time:
        raise ValueError(
            "Check-in time is missing"
        )

    now = datetime.utcnow()

    if now < checkin_record.check_in_time:
        raise ValueError(
            "Checkout time cannot be before check-in time"
        )

    checkin_record.check_out_time = now
    checkin_record.status = "CHECKED_OUT"

    booking.status = "CHECKED_OUT"

    db.commit()

    db.refresh(booking)
    db.refresh(checkin_record)

    return booking, checkin_record