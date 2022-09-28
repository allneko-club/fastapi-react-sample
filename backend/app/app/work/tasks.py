from app.celery import celery_app


@celery_app.task(acks_late=True)
def celery_sample(word: str) -> str:
    return f"test task return {word}"
