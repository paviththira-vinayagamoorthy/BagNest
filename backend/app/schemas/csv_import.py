from pydantic import BaseModel


class CSVImportResponse(BaseModel):
    message: str
    filename: str

    total_rows: int
    valid_rows: int
    invalid_rows: int

    imported_storage_ids: list[int]

    errors: list[dict]