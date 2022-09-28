from pydantic import BaseModel, EmailStr

from app.item.schemas import ItemSchema


class UserSchemaBase(BaseModel):
    email: EmailStr | None
    is_active: bool | None = True
    is_superuser: bool = False
    name: str | None = None


class UserCreateSchema(UserSchemaBase):
    email: EmailStr
    password: str


class UserUpdateSchema(UserSchemaBase):
    password: str | None = None


class UserInDBSchemaBase(UserSchemaBase):
    id: int | None = None
    items: list[ItemSchema] = []

    class Config:
        orm_mode = True


class UserSchema(UserInDBSchemaBase):
    """
    apiで返すためのモデル
    passwordやhashed_passwordはセキュリティーのため含めない
    """
    pass
