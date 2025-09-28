from fastapi import FastAPI
import asyncio


app = FastAPI()


@app.get("/ping")
async def ping(): 
    return {"message": "pong"}


@app.get('/cpu-bound') 
async def cpu_bound():
    count = 0
    for _ in range(1_000_000):
        count += 1 
    return {"message": "CPU Bound"}


@app.get('/io-bound') 
async def io_bound():
    await asyncio.sleep(0.1)
    return {"message": "IO Bound"}

