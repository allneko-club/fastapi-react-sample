from typing import Generator

import faker
from faker.providers import internet
from fastapi.testclient import TestClient
import pytest
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine

from app.core.dependencies import get_db
from app.core.config import settings
from app.core.database import Base
from app.main import app
from app.tests.utils.utils import get_superuser_token_headers
from app.initial_data import init_db
from app.user.cruds import crud_user
from app.user.schemas import UserCreateSchema, UserUpdateSchema

fake = faker.Faker()
fake.add_provider(internet)

Session = scoped_session(sessionmaker())
engine = create_engine('sqlite:///./test.db', connect_args={"check_same_thread": False})
Session.configure(bind=engine)
Base.metadata.create_all(bind=engine)


def user_authentication_headers(client: TestClient, email: str, password: str):
    data = {"username": email, "password": password}
    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=data)
    response = r.json()
    auth_token = response["access_token"]
    headers = {"Authorization": f"Bearer {auth_token}"}
    return headers


def authentication_token_from_email(client: TestClient, email: str, db: Session):
    """
    Return a valid token for the user with given email.
    If the user doesn't exist it is created first.
    """
    password = fake.pystr()
    user = crud_user.get_by_email(db, email=email)
    if not user:
        user_in_create = UserCreateSchema(username=email, email=email, password=password)
        user = crud_user.create(db, user_in_create)
    else:
        user_in_update = UserUpdateSchema(password=password)
        user = crud_user.update(db, user, user_in_update)

    return user_authentication_headers(client=client, email=email, password=password)


def override_get_db():
    try:
        db = Session()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="session")
def db() -> Generator:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = Session()
    init_db(db)

    yield db

    db.rollback()
    Session.remove()


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def superuser_token_headers(client: TestClient) -> dict[str, str]:
    return get_superuser_token_headers(client)


@pytest.fixture(scope="module")
def normal_user_token_headers(client: TestClient, db: Session) -> dict[str, str]:
    return authentication_token_from_email(client, settings.EMAIL_TEST_USER, db)
