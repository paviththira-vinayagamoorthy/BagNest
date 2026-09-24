from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.booking import (
    BookingCreate,
    BookingResponse,
)
from app.services.auth import get_current_user
from app.services.booking import (
    cancel_booking,
    create_booking,
    get_booking_by_id,
    get_my_bookings,
)


router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"],
)


@router.post(
    "",
    response_model=BookingResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_booking(
    data: BookingCreate,
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    # Only travellers can create bookings.
    if current_user.role != "traveller":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only travellers can create bookings",
        )

    try:

        booking = create_booking(
            db=db,
            traveller_id=current_user.id,
            storage_id=data.storage_id,
            bags_count=data.bags_count,
            start_time=data.start_time,
            end_time=data.end_time,
        )

        return booking

    except LookupError as exc:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )

    except OverflowError as exc:

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.get(
    "/my",
    response_model=list[BookingResponse],
)
def get_my_booking_list(
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    if current_user.role != "traveller":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only travellers can view traveller bookings",
        )

    return get_my_bookings(
        db=db,
        traveller_id=current_user.id,
    )


@router.put(
    "/{booking_id}/cancel",
    response_model=BookingResponse,
)
def cancel_my_booking(
    booking_id: int,
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    booking = get_booking_by_id(
        db=db,
        booking_id=booking_id,
    )

    if not booking:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )

    # Only booking owner can cancel.
    if booking.traveller_id != current_user.id:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only cancel your own booking",
        )

    try:

        return cancel_booking(
            db=db,
            booking=booking,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )