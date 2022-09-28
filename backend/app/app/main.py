from fastapi import APIRouter, FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.item.routers import router as item_router
from app.mail.routers import router as mail_router
from app.user.routers import login, user
from app.work.routers import router as work_router

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(user.router, prefix="/users", tags=["users"])
api_router.include_router(work_router, prefix="/works", tags=["works"])
api_router.include_router(mail_router, prefix="/mails", tags=["mails"])
api_router.include_router(item_router, prefix="/items", tags=["items"])

app.include_router(api_router, prefix=settings.API_V1_STR)
