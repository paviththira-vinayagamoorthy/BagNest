from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.storage import (
    StorageCreate,
    StorageResponse,
    StorageUpdate,
)
from app.services.auth import (
    get_current_user,
    require_role,
)
from app.services.storage import (
    create_storage,
    delete_storage,
    get_all_storage,
    get_storage_by_id,
    update_storage,
)


router = APIRouter(
    prefix="/storage",
    tags=["Storage"],
)


@router.get(
    "",
    response_model=list[StorageResponse],
)
def list_storage(
    city: str | None = Query(
        default=None,
        description="Search storage by city",
    ),
    db: Session = Depends(get_db),
):

    return get_all_storage(
        db=db,
        city=city,
    )


@router.get(
    "/{storage_id}",
    response_model=StorageResponse,
)
def get_storage(
    storage_id: int,
    db: Session = Depends(get_db),
):

    storage = get_storage_by_id(
        db=db,
        storage_id=storage_id,
    )

    if not storage or not storage.active:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Storage location not found",
        )

    return storage


@router.post(
    "",
    response_model=StorageResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_storage(
    data: StorageCreate,
    current_user=Depends(
        require_role("partner", "admin")
    ),
    db: Session = Depends(get_db),
):

    try:

        return create_storage(
            db=db,
            partner_id=current_user.id,
            name=data.name,
            address=data.address,
            city=data.city,
            capacity=data.capacity,
            price_per_bag=data.price_per_bag,
            opening_time=data.opening_time,
            closing_time=data.closing_time,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.put(
    "/{storage_id}",
    response_model=StorageResponse,
)
def update_existing_storage(
    storage_id: int,
    data: StorageUpdate,
    current_user=Depends(
        require_role("partner", "admin")
    ),
    db: Session = Depends(get_db),
):

    storage = get_storage_by_id(
        db=db,
        storage_id=storage_id,
    )

    if not storage:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Storage location not found",
        )

    # Admin can update any storage
    # Partner can update only own storage
    if (
        current_user.role != "admin"
        and storage.partner_id != current_user.id
    ):

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own storage",
        )

    try:

        return update_storage(
            db=db,
            storage=storage,
            data=data,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.delete(
    "/{storage_id}",
)
def delete_existing_storage(
    storage_id: int,
    current_user=Depends(
        require_role("partner", "admin")
    ),
    db: Session = Depends(get_db),
):

    storage = get_storage_by_id(
        db=db,
        storage_id=storage_id,
    )

    if not storage:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Storage location not found",
        )

    if (
        current_user.role != "admin"
        and storage.partner_id != current_user.id
    ):

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own storage",
        )

    delete_storage(
        db=db,
        storage=storage,
    )

    return {
        "message": "Storage location deleted successfully",
        "storage_id": storage.id,
    }