# quick start

```bash
#-- boot
$ docker compose up -d --build

#-- after boot, check server is running
$ curl http://localhost:8000/hello/1
Hello, world! 1

#-- benchmark
$ ./becnhmark.sh

#-- check result
$ cat result.txt
```
