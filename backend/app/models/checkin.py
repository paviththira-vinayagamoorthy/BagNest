from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class CheckInCheckout(Base):
    __tablename__ = "checkin_checkout"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True,
    )

    booking_id: Mapped[int] = mapped_column(
        ForeignKey("bookings.id"),
        unique=True,
        nullable=False,
        index=True,
    )

    check_in_time: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    check_out_time: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="PENDING",
    )