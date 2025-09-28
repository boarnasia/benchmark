import asyncio
from django.http import JsonResponse


async def ping(request):
    return JsonResponse({"message": "pong"})

async def cpu_bound(request):
    count = 0
    for _ in range(1_000_000):
        count += 1
    return JsonResponse({"message": "CPU Bound"})

async def io_bound(request):
    await asyncio.sleep(0.1)
    return JsonResponse({"message": "IO Bound"})
