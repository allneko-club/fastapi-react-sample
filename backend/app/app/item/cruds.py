"""
他の定義方法
# from .base import CRUDBase
# from app.models.item import Item
# from app.schemas.item import ItemCreate, ItemUpdate

# item = CRUDBase[Item, ItemCreate, ItemUpdate](Item)
"""
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.core.crud import CRUDBase
from app.item.models import Item
from app.item.schemas import ItemCreateSchema, ItemUpdateSchema


class CRUDItem(CRUDBase[Item, ItemCreateSchema, ItemUpdateSchema]):
    def create_with_owner(
        self, db: Session, *, obj_in: ItemCreateSchema, owner_id: int
    ) -> Item:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, owner_id=owner_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100
    ) -> list[Item]:
        return (
            db.query(self.model)
            .filter(Item.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


crud_item = CRUDItem(Item)
