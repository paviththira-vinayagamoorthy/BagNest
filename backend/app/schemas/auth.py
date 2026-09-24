from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class RegisterRequest(BaseModel):

    username: str = Field(
        min_length=3,
        max_length=50,
    )

    email: EmailStr

    full_name: str = Field(
        min_length=2,
        max_length=100,
    )

    password: str = Field(
        min_length=6,
        max_length=100,
    )

    role: str = Field(
        default="traveller",
    )


class LoginRequest(BaseModel):

    username_or_email: str

    password: str


class UserResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    username: str
    email: EmailStr
    full_name: str
    role: str
    active: bool
    created_at: datetime


class TokenResponse(BaseModel):

    access_token: str
    token_type: str = "bearer"
    user: UserResponse