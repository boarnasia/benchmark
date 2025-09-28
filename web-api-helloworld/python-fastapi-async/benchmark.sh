#!/bin/env bash

echo "Warming up..."
docker run --rm -it --network host williamyeh/wrk \
    -t4 -c100 -d60s http://localhost:8000/ping

echo "Start benchmark... ping"
docker run --rm -it --network host williamyeh/wrk \
    -t4 -c100 -d60s http://localhost:8000/ping \
    2>&1 | tee result-ping.txt

echo "Start benchmark... cpu bound"
docker run --rm -it --network host williamyeh/wrk \
    -t4 -c100 -d60s http://localhost:8000/cpu-bound \
    2>&1 | tee result-cpu-bound.txt

echo "Start benchmark... io bound"
docker run --rm -it --network host williamyeh/wrk \
    -t4 -c100 -d60s http://localhost:8000/io-bound \
    2>&1 | tee result-io-bound.txt
