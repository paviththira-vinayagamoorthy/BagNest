from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    status,
)
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.csv_import import CSVImportResponse
from app.services.auth import get_current_user
from app.services.csv_import import import_storage_csv


router = APIRouter(
    prefix="/storage",
    tags=["CSV Import"],
)


@router.post(
    "/import-csv",
    response_model=CSVImportResponse,
)
async def import_storage_from_csv(
    file: UploadFile = File(...),
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    # Only partners can bulk import storage.
    if current_user.role != "partner":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only partners can import storage CSV files",
        )

    # Check filename.
    if not file.filename:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Filename is required",
        )

    if not file.filename.lower().endswith(".csv"):

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only CSV files are allowed",
        )

    try:

        file_content = await file.read()

        if not file_content:

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="CSV file is empty",
            )

        result = import_storage_csv(
            db=db,
            partner_id=current_user.id,
            filename=file.filename,
            file_content=file_content,
        )

        return result

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )

    except HTTPException:
        raise

    except Exception:

        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="CSV import failed",
        )