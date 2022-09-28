from pydantic import BaseModel


class ItemSchemaBase(BaseModel):
    title: str | None = None
    description: str | None = None


class ItemCreateSchema(ItemSchemaBase):
    title: str


class ItemUpdateSchema(ItemSchemaBase):
    pass


class ItemSchema(ItemSchemaBase):
    id: int
    title: str
    owner_id: int

    class Config:
        orm_mode = True
