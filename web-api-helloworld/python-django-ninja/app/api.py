import asyncio
from ninja import Router
from django.shortcuts import get_object_or_404


router = Router()


@router.get("/ping")
def ping(request):
    return {"message": "pong"}

@router.get("/cpu-bound")
def cpu_bound(request):
    count = 0
    for _ in range(1_000_000):
        count += 1 
    return {"message": "CPU Bound"}

@router.get('/io-bound') 
async def io_bound(request):
    await asyncio.sleep(0.02)
    return {"message": "IO Bound"}
