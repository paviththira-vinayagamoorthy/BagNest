from sqlalchemy import or_, select
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.models.user import User
from app.utils.security import (
    hash_password,
    verify_password,
    decode_access_token,
)
from app.database import get_db


bearer_scheme = HTTPBearer()

ALLOWED_ROLES = {
    "traveller",
    "partner",
}


def register_user(
    db: Session,
    username: str,
    email: str,
    full_name: str,
    password: str,
    role: str,
):
    if role not in ALLOWED_ROLES:
        raise ValueError(
            "Role must be traveller or partner"
        )

    existing_user = db.scalar(
        select(User).where(
            or_(
                User.username == username,
                User.email == email,
            )
        )
    )

    if existing_user:
        if existing_user.username == username:
            raise ValueError(
                "Username already exists"
            )

        raise ValueError(
            "Email already exists"
        )

    user = User(
        username=username,
        email=email,
        full_name=full_name,
        hashed_password=hash_password(password),
        role=role,
        active=True,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    username_or_email: str,
    password: str,
):
    user = db.scalar(
        select(User).where(
            or_(
                User.username == username_or_email,
                User.email == username_or_email,
            )
        )
    )

    if not user:
        return None

    if not verify_password(
        password,
        user.hashed_password,
    ):
        return None

    if not user.active:
        return None

    return user


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = decode_access_token(token)
        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    user = db.get(User, int(user_id))

    if not user or not user.active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive",
        )

    return user