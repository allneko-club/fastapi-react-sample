from fastapi.encoders import jsonable_encoder

from app.tests.conftest import fake
from app.user.cruds import crud_user
from app.user.schemas import UserCreateSchema, UserUpdateSchema
from app.user.password import verify_password


def test_create_user(db):
    email = fake.email()
    password = fake.pystr()
    user_in = UserCreateSchema(email=email, password=password)
    user = crud_user.create(db, user_in)
    assert user.email == email
    assert hasattr(user, "hashed_password")


def test_authenticate_user(db):
    email = fake.email()
    password = fake.pystr()
    user_in = UserCreateSchema(email=email, password=password)
    user = crud_user.create(db, user_in)
    authenticated_user = crud_user.authenticate(db, email, password)
    assert authenticated_user
    assert user.email == authenticated_user.email


def test_not_authenticate_user(db):
    email = fake.email()
    password = fake.pystr()
    user = crud_user.authenticate(db, email, password)
    assert user is None


def test_check_if_user_is_active(db):
    email = fake.email()
    password = fake.pystr()
    user_in = UserCreateSchema(email=email, password=password)
    user = crud_user.create(db, user_in)
    assert user.is_active


def test_check_if_user_is_active_inactive(db):
    email = fake.email()
    password = fake.pystr()
    user_in = UserCreateSchema(email=email, password=password, disabled=True)
    user = crud_user.create(db, user_in)
    assert user.is_active


def test_check_if_user_is_superuser(db):
    email = fake.email()
    password = fake.pystr()
    user_in = UserCreateSchema(email=email, password=password, is_superuser=True)
    user = crud_user.create(db, user_in)
    assert user.is_superuser is True


def test_check_if_user_is_superuser_normal_user(db):
    username = fake.email()
    password = fake.pystr()
    user_in = UserCreateSchema(email=username, password=password)
    user = crud_user.create(db, user_in)
    assert user.is_superuser is False


def test_get_user(db):
    password = fake.pystr()
    username = fake.email()
    user_in = UserCreateSchema(email=username, password=password, is_superuser=True)
    user = crud_user.create(db, user_in)
    user_2 = crud_user.get(db, id=user.id)
    assert user_2
    assert user.email == user_2.email
    assert jsonable_encoder(user) == jsonable_encoder(user_2)


def test_update_user(db):
    password = fake.pystr()
    email = fake.email()
    user_in = UserCreateSchema(email=email, password=password, is_superuser=True)
    user = crud_user.create(db, user_in)
    new_password = fake.pystr()
    user_in_update = UserUpdateSchema(password=new_password, is_superuser=True)
    crud_user.update(db, db_obj=user, obj_in=user_in_update)
    user_2 = crud_user.get(db, id=user.id)
    assert user_2
    assert user.email == user_2.email
    assert verify_password(new_password, user_2.hashed_password)
