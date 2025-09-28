from django.urls import path
from app.views import ping, cpu_bound, io_bound

urlpatterns = [
    path("ping", ping, name="ping"),
    path("cpu-bound", cpu_bound, name="cpu_bound"),
    path("io-bound", io_bound, name="io_bound"),
]
