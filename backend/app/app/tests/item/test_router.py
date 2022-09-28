from app.item.cruds import crud_item
from app.core.config import settings
from app.tests.factories import ItemFactory
from app.user.cruds import crud_user


def test_read_items(client, superuser_token_headers, db):
    item = ItemFactory()
    response = client.get(
        f"{settings.API_V1_STR}/items/", headers=superuser_token_headers,
    )
    assert response.status_code == 200
    all_items = response.json()
    assert len(all_items) > 0


def test_read_items_if_normal_user(client, normal_user_token_headers, db):
    user = crud_user.get_by_email(db, settings.EMAIL_TEST_USER)
    item = ItemFactory(owner=user)
    response = client.get(
        f"{settings.API_V1_STR}/items/", headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    all_items = response.json()
    assert len(all_items) > 0
    for item in all_items:
        assert item['owner_id'] == user.id


def test_create_item(client, superuser_token_headers, db):
    data = {"title": "Foo", "description": "Fighters"}
    response = client.post(
        f"{settings.API_V1_STR}/items/", headers=superuser_token_headers, json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["description"] == data["description"]
    assert "id" in content
    assert "owner_id" in content


def test_read_item(client, superuser_token_headers, db):
    item = ItemFactory()
    response = client.get(
        f"{settings.API_V1_STR}/items/{item.id}", headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == item.title
    assert content["description"] == item.description
    assert content["id"] == item.id
    assert content["owner_id"] == item.owner_id


def test_read_item_not_found(client, superuser_token_headers, db):
    response = client.get(
        f"{settings.API_V1_STR}/items/10000", headers=superuser_token_headers,
    )
    assert response.status_code == 404


def test_read_item_if_no_permissions(client, normal_user_token_headers, db):
    item = ItemFactory()
    response = client.get(
        f"{settings.API_V1_STR}/items/{item.id}", headers=normal_user_token_headers,
    )
    assert response.status_code == 400


def test_update_item(client, superuser_token_headers, db):
    item = ItemFactory()
    data = {"title": "Foo", "description": "Fighters"}
    response = client.put(
        f"{settings.API_V1_STR}/items/{item.id}", headers=superuser_token_headers, json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["description"] == data["description"]
    assert "id" in content
    assert "owner_id" in content


def test_update_item_if_item_not_found(client, superuser_token_headers, db):
    data = {"title": "Foo", "description": "Fighters"}
    response = client.put(
        f"{settings.API_V1_STR}/items/10000", headers=superuser_token_headers, json=data,
    )
    assert response.status_code == 404


def test_update_item_if_no_permissions(client, normal_user_token_headers, db):
    item = ItemFactory()
    data = {"title": "Foo", "description": "Fighters"}
    response = client.put(
        f"{settings.API_V1_STR}/items/{item.id}", headers=normal_user_token_headers, json=data,
    )
    assert response.status_code == 400


def test_delete_item(client, superuser_token_headers, db):
    item = ItemFactory()
    response = client.delete(
        f"{settings.API_V1_STR}/items/{item.id}", headers=superuser_token_headers,
    )
    assert response.status_code == 200
    assert crud_item.get(db, item.id) is None


def test_delete_item_not_found(client, superuser_token_headers, db):
    response = client.delete(
        f"{settings.API_V1_STR}/items/10000", headers=superuser_token_headers,
    )
    assert response.status_code == 404


def test_delete_item_if_no_permissions(client, normal_user_token_headers, db):
    item = ItemFactory()
    response = client.delete(
        f"{settings.API_V1_STR}/items/{item.id}", headers=normal_user_token_headers,
    )
    assert response.status_code == 400
