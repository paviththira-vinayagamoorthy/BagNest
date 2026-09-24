from datetime import time

import pandas as pd
from sqlalchemy.orm import Session

from app.models.csv_import import CSVImport
from app.models.storage import StorageLocation


REQUIRED_COLUMNS = {
    "name",
    "address",
    "city",
    "capacity",
    "price_per_bag",
    "opening_time",
    "closing_time",
}


def parse_time_value(value):
    """
    Convert CSV time value into Python time.
    Accepts:
    08:00
    08:00:00
    """

    if pd.isna(value):
        raise ValueError(
            "Time value is required"
        )

    value = str(value).strip()

    for time_format in (
        "%H:%M",
        "%H:%M:%S",
    ):

        try:

            from datetime import datetime

            return datetime.strptime(
                value,
                time_format,
            ).time()

        except ValueError:
            continue

    raise ValueError(
        "Time must be in HH:MM or HH:MM:SS format"
    )


def validate_text(
    value,
    field_name: str,
):
    if pd.isna(value):
        raise ValueError(
            f"{field_name} is required"
        )

    value = str(value).strip()

    if not value:
        raise ValueError(
            f"{field_name} is required"
        )

    return value


def validate_integer(
    value,
    field_name: str,
    minimum: int = 1,
):
    if pd.isna(value):
        raise ValueError(
            f"{field_name} is required"
        )

    try:
        number = float(value)
    except (ValueError, TypeError):
        raise ValueError(
            f"{field_name} must be a number"
        )

    if not number.is_integer():
        raise ValueError(
            f"{field_name} must be a whole number"
        )

    number = int(number)

    if number < minimum:
        raise ValueError(
            f"{field_name} must be at least {minimum}"
        )

    return number


def validate_price(value):
    if pd.isna(value):
        raise ValueError(
            "price_per_bag is required"
        )

    try:
        price = float(value)
    except (ValueError, TypeError):
        raise ValueError(
            "price_per_bag must be a number"
        )

    if price < 0:
        raise ValueError(
            "price_per_bag cannot be negative"
        )

    return price


def import_storage_csv(
    db: Session,
    partner_id: int,
    filename: str,
    file_content: bytes,
):
    """
    Read, validate and import storage locations
    from CSV using Pandas.
    """

    try:

        from io import BytesIO

        dataframe = pd.read_csv(
            BytesIO(file_content)
        )

    except Exception as exc:

        raise ValueError(
            f"Could not read CSV file: {exc}"
        )

    # Clean column names.
    dataframe.columns = [
        str(column).strip()
        for column in dataframe.columns
    ]

    missing_columns = (
        REQUIRED_COLUMNS
        - set(dataframe.columns)
    )

    if missing_columns:

        missing = ", ".join(
            sorted(missing_columns)
        )

        raise ValueError(
            f"Missing required columns: {missing}"
        )

    total_rows = len(dataframe)

    valid_rows = 0
    invalid_rows = 0

    errors = []

    imported_storage_ids = []

    for index, row in dataframe.iterrows():

        csv_row_number = index + 2

        try:

            name = validate_text(
                row["name"],
                "name",
            )

            address = validate_text(
                row["address"],
                "address",
            )

            city = validate_text(
                row["city"],
                "city",
            )

            capacity = validate_integer(
                row["capacity"],
                "capacity",
                minimum=1,
            )

            price_per_bag = validate_price(
                row["price_per_bag"]
            )

            opening_time = parse_time_value(
                row["opening_time"]
            )

            closing_time = parse_time_value(
                row["closing_time"]
            )

            if opening_time >= closing_time:

                raise ValueError(
                    "opening_time must be before closing_time"
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

            # Flush gives us the generated ID
            # before final commit.
            db.flush()

            imported_storage_ids.append(
                storage.id
            )

            valid_rows += 1

        except Exception as exc:

            invalid_rows += 1

            errors.append(
                {
                    "row": csv_row_number,
                    "error": str(exc),
                }
            )

    # Save valid rows.
    db.commit()

    # Save import history.
    import_record = CSVImport(
        partner_id=partner_id,
        filename=filename,
        total_rows=total_rows,
        valid_rows=valid_rows,
        invalid_rows=invalid_rows,
    )

    db.add(import_record)
    db.commit()

    return {
        "message": "CSV import completed",
        "filename": filename,
        "total_rows": total_rows,
        "valid_rows": valid_rows,
        "invalid_rows": invalid_rows,
        "imported_storage_ids": imported_storage_ids,
        "errors": errors,
    }