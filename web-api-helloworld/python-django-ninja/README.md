# Requirements

- django
- django-ninja
- mysql

# specific requirements

- table: hello
    - id: int, primary key
    - message: str
- hello テーブルのid:1には "Hello, World!" が入っている
- GET /hello/1 で `{"message": "Hello, World!"}` を返す

# 最新の結果

```bash
$ d_wrk -t4 -c100 -d60s http://localhost:8000/hello/1
Running 1m test @ http://localhost:8000/hello/1
  4 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   131.19ms  148.59ms   1.20s    89.23%
    Req/Sec   277.74    104.94   484.00     77.31%
  61428 requests in 1.00m, 17.11MB read
Requests/sec:   1023.35
Transfer/sec:    291.82KB
```
