from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.user.models import User
from app.item.schemas import ItemSchema, ItemCreateSchema, ItemUpdateSchema
from app.item.cruds import crud_item
from app.core.dependencies import get_db
from app.user.dependencies import get_current_active_user

router = APIRouter()


@router.get("/", response_model=list[ItemSchema])
def read_items(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Retrieve items.
    """
    if current_user.is_superuser:
        items = crud_item.get_multi(db, skip=skip, limit=limit)
    else:
        items = crud_item.get_multi_by_owner(
            db, owner_id=current_user.id, skip=skip, limit=limit
        )
    return items


@router.post("/", response_model=ItemSchema)
def create_item(
    item_in: ItemCreateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Create new item.
    """
    item = crud_item.create_with_owner(db, obj_in=item_in, owner_id=current_user.id)
    return item


@router.get("/{id}", response_model=ItemSchema)
def read_item(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get item by ID.
    """
    item = crud_item.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return item


@router.put("/{id}", response_model=ItemSchema)
def update_item(
    id: int,
    item_in: ItemUpdateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Update an item.
    """
    item = crud_item.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    item = crud_item.update(db, db_obj=item, obj_in=item_in)
    return item


@router.delete("/{id}", response_model=ItemSchema)
def delete_item(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Delete an item.
    """
    item = crud_item.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    item = crud_item.remove(db, id)
    return item
