from fastapi import FastAPI
import time


app = FastAPI()


@app.get("/ping")
def ping(): 
    return {"message": "pong"}


@app.get('/cpu-bound') 
def cpu_bound():
    count = 0
    for _ in range(1_000_000):
        count += 1 
    return {"message": "CPU Bound"}


@app.get('/io-bound') 
def io_bound():
    time.sleep(0.1)
    return {"message": "IO Bound"}

