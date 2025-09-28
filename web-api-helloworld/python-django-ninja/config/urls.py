from django.urls import path, include
from ninja import NinjaAPI
from app.api import router

api = NinjaAPI(
    title="Benchmark API",
    version="1.0.0",
    docs_url=None,  # Disable docs for performance
)

api.add_router("/", router)

urlpatterns = [
    path("", api.urls),
]
