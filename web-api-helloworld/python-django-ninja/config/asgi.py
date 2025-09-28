import os
from django.core.asgi import get_asgi_application, ASGIHandler

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application: ASGIHandler = get_asgi_application()

