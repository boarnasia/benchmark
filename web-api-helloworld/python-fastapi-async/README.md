# quick start

```bash
#-- boot
$ docker compose up -d --build

#-- after boot, check server is running
$ curl http://localhost:8000/ping
{"message":"pong"}

#-- benchmark
$ ./becnhmark.sh

#-- check result
$ cat result-ping.txt
$ cat result-io-bound.txt
```
