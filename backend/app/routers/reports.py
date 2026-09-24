from datetime import date

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
)
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.reports import (
    CheckinReportResponse,
    OccupancyReportResponse,
    RevenueReportResponse,
)
from app.services.auth import get_current_user
from app.services.reports import (
    build_checkin_dataframe,
    build_occupancy_dataframe,
    build_revenue_dataframe,
    dataframe_to_csv,
    dataframe_to_pdf,
)


router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


def check_report_access(
    current_user,
):

    if current_user.role not in {
        "partner",
        "admin",
    }:

        raise HTTPException(
            status_code=403,
            detail="Only partners or admins can access reports",
        )


@router.get(
    "/occupancy",
    response_model=OccupancyReportResponse,
)
def occupancy_report(
    report_date: date = Query(
        default=None,
        description="Report date in YYYY-MM-DD format",
    ),
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    check_report_access(
        current_user
    )

    if report_date is None:
        report_date = date.today()

    dataframe = build_occupancy_dataframe(
        db=db,
        current_user=current_user,
        report_date=report_date,
    )

    total_capacity = int(
        dataframe["capacity"].sum()
    ) if not dataframe.empty else 0

    total_booked_bags = int(
        dataframe["max_booked_bags"].sum()
    ) if not dataframe.empty else 0

    total_storage = len(dataframe)

    overall_occupancy = 0

    if total_capacity > 0:

        overall_occupancy = round(
            (
                total_booked_bags
                / total_capacity
            )
            * 100,
            2,
        )

    records = dataframe.to_dict(
        orient="records"
    )

    return {
        "report_date": report_date.isoformat(),
        "total_storage_locations": total_storage,
        "total_capacity": total_capacity,
        "total_booked_bags": total_booked_bags,
        "overall_occupancy_percentage": overall_occupancy,
        "storage": records,
    }


@router.get(
    "/revenue",
    response_model=RevenueReportResponse,
)
def revenue_report(
    start_date: date | None = Query(
        default=None
    ),
    end_date: date | None = Query(
        default=None
    ),
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    check_report_access(
        current_user
    )

    if (
        start_date
        and end_date
        and start_date > end_date
    ):

        raise HTTPException(
            status_code=400,
            detail="start_date must be before or equal to end_date",
        )

    dataframe = build_revenue_dataframe(
        db=db,
        current_user=current_user,
        start_date=start_date,
        end_date=end_date,
    )

    total_bookings = len(dataframe)

    total_bags = int(
        dataframe["bags_count"].sum()
    ) if not dataframe.empty else 0

    total_revenue = round(
        float(
            dataframe["total_price"].sum()
        ) if not dataframe.empty else 0,
        2,
    )

    records = dataframe.to_dict(
        orient="records"
    )

    return {
        "total_bookings": total_bookings,
        "total_bags": total_bags,
        "total_revenue": total_revenue,
        "bookings": records,
    }


@router.get(
    "/checkins",
    response_model=CheckinReportResponse,
)
def checkin_report(
    start_date: date | None = Query(
        default=None
    ),
    end_date: date | None = Query(
        default=None
    ),
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    check_report_access(
        current_user
    )

    if (
        start_date
        and end_date
        and start_date > end_date
    ):

        raise HTTPException(
            status_code=400,
            detail="start_date must be before or equal to end_date",
        )

    dataframe = build_checkin_dataframe(
        db=db,
        current_user=current_user,
        start_date=start_date,
        end_date=end_date,
    )

    total_records = len(dataframe)

    checked_in = 0
    checked_out = 0

    if not dataframe.empty:

        checked_in = int(
            (
                dataframe["status"]
                == "CHECKED_IN"
            ).sum()
        )

        checked_out = int(
            (
                dataframe["status"]
                == "CHECKED_OUT"
            ).sum()
        )

    records = dataframe.to_dict(
        orient="records"
    )

    return {
        "total_records": total_records,
        "checked_in": checked_in,
        "checked_out": checked_out,
        "records": records,
    }


@router.get(
    "/occupancy/csv",
)
def occupancy_csv(
    report_date: date = Query(
        default=None
    ),
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    check_report_access(
        current_user
    )

    if report_date is None:
        report_date = date.today()

    dataframe = build_occupancy_dataframe(
        db=db,
        current_user=current_user,
        report_date=report_date,
    )

    output = dataframe_to_csv(
        dataframe
    )

    filename = (
        f"occupancy_{report_date}.csv"
    )

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={
            "Content-Disposition":
                f'attachment; filename="{filename}"'
        },
    )


@router.get(
    "/revenue/csv",
)
def revenue_csv(
    start_date: date | None = Query(
        default=None
    ),
    end_date: date | None = Query(
        default=None
    ),
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    check_report_access(
        current_user
    )

    dataframe = build_revenue_dataframe(
        db=db,
        current_user=current_user,
        start_date=start_date,
        end_date=end_date,
    )

    output = dataframe_to_csv(
        dataframe
    )

    filename = "revenue_report.csv"

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={
            "Content-Disposition":
                f'attachment; filename="{filename}"'
        },
    )


@router.get(
    "/checkins/csv",
)
def checkins_csv(
    start_date: date | None = Query(
        default=None
    ),
    end_date: date | None = Query(
        default=None
    ),
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    check_report_access(
        current_user
    )

    dataframe = build_checkin_dataframe(
        db=db,
        current_user=current_user,
        start_date=start_date,
        end_date=end_date,
    )

    output = dataframe_to_csv(
        dataframe
    )

    filename = "checkin_report.csv"

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={
            "Content-Disposition":
                f'attachment; filename="{filename}"'
        },
    )


@router.get(
    "/occupancy/pdf",
)
def occupancy_pdf(
    report_date: date = Query(
        default=None
    ),
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    check_report_access(
        current_user
    )

    if report_date is None:
        report_date = date.today()

    dataframe = build_occupancy_dataframe(
        db=db,
        current_user=current_user,
        report_date=report_date,
    )

    output = dataframe_to_pdf(
        dataframe=dataframe,
        title=f"Daily Occupancy Report - {report_date}",
        generated_by=current_user.username,
    )

    filename = (
        f"occupancy_{report_date}.pdf"
    )

    return StreamingResponse(
        output,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
                f'attachment; filename="{filename}"'
        },
    )


@router.get(
    "/revenue/pdf",
)
def revenue_pdf(
    start_date: date | None = Query(
        default=None
    ),
    end_date: date | None = Query(
        default=None
    ),
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    check_report_access(
        current_user
    )

    dataframe = build_revenue_dataframe(
        db=db,
        current_user=current_user,
        start_date=start_date,
        end_date=end_date,
    )

    output = dataframe_to_pdf(
        dataframe=dataframe,
        title="Booking & Revenue Report",
        generated_by=current_user.username,
    )

    filename = "revenue_report.pdf"

    return StreamingResponse(
        output,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
                f'attachment; filename="{filename}"'
        },
    )


@router.get(
    "/checkins/pdf",
)
def checkins_pdf(
    start_date: date | None = Query(
        default=None
    ),
    end_date: date | None = Query(
        default=None
    ),
    current_user=Depends(
        get_current_user
    ),
    db: Session = Depends(get_db),
):

    check_report_access(
        current_user
    )

    dataframe = build_checkin_dataframe(
        db=db,
        current_user=current_user,
        start_date=start_date,
        end_date=end_date,
    )

    output = dataframe_to_pdf(
        dataframe=dataframe,
        title="Check-in / Check-out Report",
        generated_by=current_user.username,
    )

    filename = "checkin_report.pdf"

    return StreamingResponse(
        output,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
                f'attachment; filename="{filename}"'
        },
    )