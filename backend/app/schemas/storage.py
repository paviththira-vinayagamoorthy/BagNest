from datetime import time

from pydantic import BaseModel, ConfigDict, Field


class StorageCreate(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100,
    )

    address: str = Field(
        min_length=5,
        max_length=255,
    )

    city: str = Field(
        min_length=2,
        max_length=100,
    )

    capacity: int = Field(
        gt=0,
    )

    price_per_bag: float = Field(
        ge=0,
    )

    opening_time: time

    closing_time: time


class StorageUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    address: str | None = Field(
        default=None,
        min_length=5,
        max_length=255,
    )

    city: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    capacity: int | None = Field(
        default=None,
        gt=0,
    )

    price_per_bag: float | None = Field(
        default=None,
        ge=0,
    )

    opening_time: time | None = None

    closing_time: time | None = None

    active: bool | None = None


class StorageResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    name: str
    address: str
    city: str
    capacity: int
    price_per_bag: float
    opening_time: time
    closing_time: time
    active: bool
    partner_id: int