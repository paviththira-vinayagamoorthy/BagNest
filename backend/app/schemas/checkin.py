from datetime import datetime

from pydantic import BaseModel


class CheckInResponse(BaseModel):
    booking_id: int
    reference_code: str
    booking_status: str
    check_in_time: datetime
    check_out_time: datetime | None = None
    checkin_status: str


class CheckOutResponse(BaseModel):
    booking_id: int
    reference_code: str
    booking_status: str
    check_in_time: datetime
    check_out_time: datetime
    checkin_status: str