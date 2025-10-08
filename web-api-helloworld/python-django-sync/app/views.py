import time
from django.http import JsonResponse


def ping(request):
    return JsonResponse({"message": "pong"})

def cpu_bound(request):
    count = 0
    for _ in range(1_000_000):
        count += 1
    return JsonResponse({"message": "CPU Bound"})

def io_bound(request):
    time.sleep(0.02)
    return JsonResponse({"message": "IO Bound"})
