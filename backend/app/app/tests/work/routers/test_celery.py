from app.core.config import settings


def test_celery_worker_test(client, superuser_token_headers, db):
    data = {"msg": "test"}
    r = client.post(
        f"{settings.API_V1_STR}/works/test-celery/",
        json=data,
        headers=superuser_token_headers,
    )
    response = r.json()
    assert response["msg"] == "Word received"
