from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.checkin import (
    CheckInResponse,
    CheckOutResponse,
)
from app.services.auth import get_current_user
from app.services.checkin import (
    check_in_booking,
    check_out_booking,
    get_booking_for_checkin,
)


router = APIRouter(
    prefix="/bookings",
    tags=["Check-in / Check-out"],
)


@router.put(
    "/{booking_id}/check-in",
    response_model=CheckInResponse,
)
def check_in(
    booking_id: int,
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    # Only partner/admin can check in travellers.
    if current_user.role not in {
        "partner",
        "admin",
    }:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only partners or admins can check in bookings",
        )

    booking = get_booking_for_checkin(
        db=db,
        booking_id=booking_id,
    )

    if not booking:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )

    try:

        booking, checkin_record = check_in_booking(
            db=db,
            booking=booking,
            current_user=current_user,
        )

        return {
            "booking_id": booking.id,
            "reference_code": booking.reference_code,
            "booking_status": booking.status,
            "check_in_time": checkin_record.check_in_time,
            "check_out_time": checkin_record.check_out_time,
            "checkin_status": checkin_record.status,
        }

    except PermissionError as exc:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(exc),
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.put(
    "/{booking_id}/check-out",
    response_model=CheckOutResponse,
)
def check_out(
    booking_id: int,
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    # Only partner/admin can check out travellers.
    if current_user.role not in {
        "partner",
        "admin",
    }:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only partners or admins can check out bookings",
        )

    booking = get_booking_for_checkin(
        db=db,
        booking_id=booking_id,
    )

    if not booking:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )

    try:

        booking, checkin_record = check_out_booking(
            db=db,
            booking=booking,
            current_user=current_user,
        )

        return {
            "booking_id": booking.id,
            "reference_code": booking.reference_code,
            "booking_status": booking.status,
            "check_in_time": checkin_record.check_in_time,
            "check_out_time": checkin_record.check_out_time,
            "checkin_status": checkin_record.status,
        }

    except PermissionError as exc:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(exc),
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )