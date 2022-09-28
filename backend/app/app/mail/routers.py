from fastapi import APIRouter, Depends
from pydantic.networks import EmailStr

from app.core.schemas import MsgSchema
from app.user.dependencies import get_current_active_superuser
from app.mail.utils import send_test_email
from app.user.models import User

router = APIRouter()


@router.post("/test-email/", response_model=MsgSchema, status_code=201)
def test_email(
    email_to: EmailStr,
    current_user: User = Depends(get_current_active_superuser),
):
    """
    Test emails.
    """
    send_test_email(email_to=email_to)
    return {"msg": "Test email sent"}
