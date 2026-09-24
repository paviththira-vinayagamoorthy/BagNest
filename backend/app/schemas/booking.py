from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class BookingCreate(BaseModel):
    storage_id: int = Field(gt=0)

    bags_count: int = Field(
        gt=0,
        le=100,
    )

    start_time: datetime

    end_time: datetime


class BookingResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    reference_code: str
    traveller_id: int
    storage_id: int
    bags_count: int
    start_time: datetime
    end_time: datetime
    total_price: float
    status: str
    created_at: datetime