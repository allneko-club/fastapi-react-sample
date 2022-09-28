import os

from celery import Celery
import sentry_sdk
from sentry_sdk.integrations.celery import CeleryIntegration

from app.core.config import settings


sentry_sdk.init(
    dsn=settings.SENTRY_DSN,
    integrations=[
        CeleryIntegration(),
    ],

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production,
    traces_sample_rate=1.0,
)


celery_broker = os.environ.get('CELERY_BROKER', 'amqp://guest@queue//')
celery_app = Celery('worker', broker=celery_broker)
celery_app.autodiscover_tasks(['app.work'])
