from datetime import date, datetime, time, timedelta
from io import BytesIO

import pandas as pd
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.booking import Booking
from app.models.checkin import CheckInCheckout
from app.models.storage import StorageLocation
from app.models.user import User


ACTIVE_BOOKING_STATUSES = {
    "CONFIRMED",
    "CHECKED_IN",
}


def get_storage_for_user(
    db: Session,
    current_user,
):
    """
    Partner gets only own storage.
    Admin gets all storage.
    """

    query = select(StorageLocation)

    if current_user.role == "partner":
        query = query.where(
            StorageLocation.partner_id
            == current_user.id
        )

    return db.scalars(query).all()


def get_bookings_for_user(
    db: Session,
    current_user,
    start_date: date | None = None,
    end_date: date | None = None,
):
    """
    Partner gets bookings for own storage.
    Admin gets all bookings.
    """

    query = select(Booking)

    if current_user.role == "partner":

        query = query.join(
            StorageLocation,
            Booking.storage_id
            == StorageLocation.id,
        ).where(
            StorageLocation.partner_id
            == current_user.id
        )

    if start_date:

        start_datetime = datetime.combine(
            start_date,
            time.min,
        )

        query = query.where(
            Booking.start_time
            >= start_datetime
        )

    if end_date:

        end_datetime = datetime.combine(
            end_date + timedelta(days=1),
            time.min,
        )

        query = query.where(
            Booking.start_time
            < end_datetime
        )

    query = query.order_by(
        Booking.start_time
    )

    return db.scalars(query).all()


def build_occupancy_dataframe(
    db: Session,
    current_user,
    report_date: date,
):
    """
    Calculate occupancy for each storage
    for a particular date.
    """

    storages = get_storage_for_user(
        db=db,
        current_user=current_user,
    )

    day_start = datetime.combine(
        report_date,
        time.min,
    )

    day_end = datetime.combine(
        report_date + timedelta(days=1),
        time.min,
    )

    rows = []

    for storage in storages:

        bookings = db.scalars(
            select(Booking)
            .where(
                Booking.storage_id
                == storage.id,

                Booking.status.in_(
                    ACTIVE_BOOKING_STATUSES
                ),

                Booking.start_time < day_end,

                Booking.end_time > day_start,
            )
        ).all()

        # Calculate maximum occupied bags
        # during this day.
        events = []

        for booking in bookings:

            overlap_start = max(
                booking.start_time,
                day_start,
            )

            overlap_end = min(
                booking.end_time,
                day_end,
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

        events.sort(
            key=lambda event: (
                event[0],
                0 if event[2] == "end" else 1,
            )
        )

        current_bags = 0
        max_bags = 0

        for _, bags, event_type in events:

            if event_type == "end":
                current_bags -= bags

            else:
                current_bags += bags

            max_bags = max(
                max_bags,
                current_bags,
            )

        occupancy_percentage = 0

        if storage.capacity > 0:

            occupancy_percentage = round(
                (
                    max_bags
                    / storage.capacity
                )
                * 100,
                2,
            )

        rows.append(
            {
                "storage_id": storage.id,
                "storage_name": storage.name,
                "city": storage.city,
                "capacity": storage.capacity,
                "max_booked_bags": max_bags,
                "available_capacity": max(
                    storage.capacity
                    - max_bags,
                    0,
                ),
                "occupancy_percentage": occupancy_percentage,
                "report_date": report_date.isoformat(),
            }
        )

    return pd.DataFrame(rows)


def build_revenue_dataframe(
    db: Session,
    current_user,
    start_date: date | None = None,
    end_date: date | None = None,
):
    """
    Generate booking and revenue analytics.
    """

    bookings = get_bookings_for_user(
        db=db,
        current_user=current_user,
        start_date=start_date,
        end_date=end_date,
    )

    rows = []

    for booking in bookings:

        storage = db.get(
            StorageLocation,
            booking.storage_id,
        )

        rows.append(
            {
                "booking_id": booking.id,
                "reference_code": booking.reference_code,
                "storage_id": booking.storage_id,
                "storage_name": (
                    storage.name
                    if storage
                    else "Unknown"
                ),
                "bags_count": booking.bags_count,
                "total_price": float(
                    booking.total_price
                ),
                "status": booking.status,
                "booking_date": (
                    booking.start_time.date().isoformat()
                ),
            }
        )

    columns = [
        "booking_id",
        "reference_code",
        "storage_id",
        "storage_name",
        "bags_count",
        "total_price",
        "status",
        "booking_date",
    ]

    dataframe = pd.DataFrame(
        rows,
        columns=columns,
    )

    return dataframe


def build_checkin_dataframe(
    db: Session,
    current_user,
    start_date: date | None = None,
    end_date: date | None = None,
):
    """
    Generate check-in/check-out report.
    """

    query = (
        select(
            CheckInCheckout,
            Booking,
            StorageLocation,
            User,
        )
        .join(
            Booking,
            CheckInCheckout.booking_id
            == Booking.id,
        )
        .join(
            StorageLocation,
            Booking.storage_id
            == StorageLocation.id,
        )
        .join(
            User,
            Booking.traveller_id
            == User.id,
        )
    )

    if current_user.role == "partner":

        query = query.where(
            StorageLocation.partner_id
            == current_user.id
        )

    if start_date:

        start_datetime = datetime.combine(
            start_date,
            time.min,
        )

        query = query.where(
            CheckInCheckout.check_in_time
            >= start_datetime
        )

    if end_date:

        end_datetime = datetime.combine(
            end_date + timedelta(days=1),
            time.min,
        )

        query = query.where(
            CheckInCheckout.check_in_time
            < end_datetime
        )

    query = query.order_by(
        CheckInCheckout.check_in_time
    )

    results = db.execute(query).all()

    rows = []

    for (
        checkin,
        booking,
        storage,
        traveller,
    ) in results:

        rows.append(
            {
                "booking_id": booking.id,
                "reference_code": booking.reference_code,
                "traveller": traveller.full_name,
                "storage_name": storage.name,
                "check_in_time": (
                    checkin.check_in_time.isoformat()
                    if checkin.check_in_time
                    else None
                ),
                "check_out_time": (
                    checkin.check_out_time.isoformat()
                    if checkin.check_out_time
                    else None
                ),
                "status": checkin.status,
            }
        )

    columns = [
        "booking_id",
        "reference_code",
        "traveller",
        "storage_name",
        "check_in_time",
        "check_out_time",
        "status",
    ]

    return pd.DataFrame(
        rows,
        columns=columns,
    )


def dataframe_to_csv(
    dataframe: pd.DataFrame,
) -> BytesIO:

    output = BytesIO()

    csv_bytes = dataframe.to_csv(
        index=False
    ).encode("utf-8")

    output.write(csv_bytes)
    output.seek(0)

    return output


def dataframe_to_pdf(
    dataframe: pd.DataFrame,
    title: str,
    generated_by: str,
) -> BytesIO:

    output = BytesIO()

    document = SimpleDocTemplate(
        output,
        pagesize=landscape(A4),
        rightMargin=30,
        leftMargin=30,
        topMargin=30,
        bottomMargin=30,
    )

    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph(
            "BagNest",
            styles["Title"],
        )
    )

    story.append(
        Paragraph(
            title,
            styles["Heading2"],
        )
    )

    story.append(
        Paragraph(
            f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
            styles["Normal"],
        )
    )

    story.append(
        Paragraph(
            f"Generated by: {generated_by}",
            styles["Normal"],
        )
    )

    story.append(
        Spacer(1, 15)
    )

    if dataframe.empty:

        story.append(
            Paragraph(
                "No data available for the selected period.",
                styles["Normal"],
            )
        )

    else:

        headers = list(
            dataframe.columns
        )

        table_data = [
            headers
        ]

        for _, row in dataframe.iterrows():

            table_data.append(
                [
                    str(value)
                    for value in row.tolist()
                ]
            )

        table = Table(
            table_data,
            repeatRows=1,
        )

        table.setStyle(
            TableStyle(
                [
                    (
                        "BACKGROUND",
                        (0, 0),
                        (-1, 0),
                        "#123B5D",
                    ),
                    (
                        "TEXTCOLOR",
                        (0, 0),
                        (-1, 0),
                        "#FFFFFF",
                    ),
                    (
                        "GRID",
                        (0, 0),
                        (-1, -1),
                        0.5,
                        "#999999",
                    ),
                    (
                        "FONTNAME",
                        (0, 0),
                        (-1, 0),
                        "Helvetica-Bold",
                    ),
                    (
                        "FONTSIZE",
                        (0, 0),
                        (-1, -1),
                        7,
                    ),
                    (
                        "VALIGN",
                        (0, 0),
                        (-1, -1),
                        "MIDDLE",
                    ),
                ]
            )
        )

        story.append(table)

    document.build(story)

    output.seek(0)

    return output