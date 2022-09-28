import logging
from sqlalchemy.orm import Session

from app.core.database import Base, SessionLocal, engine
from app.user.cruds import crud_user
from app.core.config import settings
from app.user.schemas import UserCreateSchema

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init_db(db: Session) -> None:
    user = crud_user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = UserCreateSchema(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud_user.create(db, user_in)


def init() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    init_db(db)


def main() -> None:
    logger.info("Creating initial data")
    init()
    logger.info("Initial data created")


if __name__ == "__main__":
    main()
