from typing import Any

from sqlalchemy.orm import Session

from app.core.crud import CRUDBase
from app.user.models import User
from app.user.schemas import UserCreateSchema, UserUpdateSchema
from app.user.password import verify_password, get_password_hash


class CRUDUser(CRUDBase[User, UserCreateSchema, UserUpdateSchema]):
    def get_by_email(self, db: Session, email: str) -> User | None:
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, obj_in: UserCreateSchema):
        db_obj = User(
            email=obj_in.email,
            hashed_password=get_password_hash(obj_in.password),
            name=obj_in.name,
            is_superuser=obj_in.is_superuser,
            is_active=obj_in.is_active,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, db_obj: User, obj_in: UserUpdateSchema | dict[str, Any]
    ):
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if "password" in update_data:
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
        return super().update(db, db_obj, update_data)

    def authenticate(self, db: Session, email: str, password: str) -> User | None:
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user


crud_user = CRUDUser(User)
