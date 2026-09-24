from pydantic import BaseModel


class OccupancyReportResponse(BaseModel):
    report_date: str
    total_storage_locations: int
    total_capacity: int
    total_booked_bags: int
    overall_occupancy_percentage: float
    storage: list[dict]


class RevenueReportResponse(BaseModel):
    total_bookings: int
    total_bags: int
    total_revenue: float
    bookings: list[dict]


class CheckinReportResponse(BaseModel):
    total_records: int
    checked_in: int
    checked_out: int
    records: list[dict]