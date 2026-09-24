from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.storage import StorageLocation


def create_storage(
    db: Session,
    partner_id: int,
    name: str,
    address: str,
    city: str,
    capacity: int,
    price_per_bag: float,
    opening_time,
    closing_time,
):

    if opening_time >= closing_time:
        raise ValueError(
            "Opening time must be before closing time"
        )

    storage = StorageLocation(
        name=name,
        address=address,
        city=city,
        capacity=capacity,
        price_per_bag=price_per_bag,
        opening_time=opening_time,
        closing_time=closing_time,
        active=True,
        partner_id=partner_id,
    )

    db.add(storage)
    db.commit()
    db.refresh(storage)

    return storage


def get_all_storage(
    db: Session,
    city: str | None = None,
):

    query = select(StorageLocation).where(
        StorageLocation.active == True
    )

    if city:
        query = query.where(
            StorageLocation.city.ilike(
                f"%{city}%"
            )
        )

    query = query.order_by(
        StorageLocation.id.desc()
    )

    return db.scalars(query).all()


def get_storage_by_id(
    db: Session,
    storage_id: int,
):

    return db.get(
        StorageLocation,
        storage_id,
    )


def update_storage(
    db: Session,
    storage,
    data,
):

    update_data = data.model_dump(
        exclude_unset=True
    )

    new_opening_time = update_data.get(
        "opening_time",
        storage.opening_time,
    )

    new_closing_time = update_data.get(
        "closing_time",
        storage.closing_time,
    )

    if new_opening_time >= new_closing_time:
        raise ValueError(
            "Opening time must be before closing time"
        )

    for field, value in update_data.items():

        setattr(
            storage,
            field,
            value,
        )

    db.commit()
    db.refresh(storage)

    return storage


def delete_storage(
    db: Session,
    storage,
):

    storage.active = False

    db.commit()
    db.refresh(storage)

    return storage