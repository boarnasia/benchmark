FROM node:22-slim

# タイムゾーン/ロケールは任意
ENV LC_ALL=C.UTF-8 LANG=C.UTF-8

# GNU time と tini（PID1のinit）を入れる
RUN apt-get update && apt-get install -y --no-install-recommends \
      jq hyperfine time tini \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /work
COPY app/ /work/app/
RUN cd /work/app && npm install
RUN chmod 755 /work/app/run_bench.sh /work/app/main.js
RUN chmod 755 /work/app/run_bench_hf.sh /work/app/main.js

# 結果を書き出す場所（compose で bind mount）
RUN mkdir -p /results

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["sleep", "infinity"]
