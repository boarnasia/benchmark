FROM python:3.12-slim

ENV LC_ALL=C.UTF-8 \
    LANG=C.UTF-8 \
    PYTHONUNBUFFERED=1

# GNU time と tini, bash を入れる
RUN apt-get update && apt-get install -y --no-install-recommends \
      jq hyperfine time tini bash procps \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /work
COPY app/ /work/app/
RUN pip install --no-cache-dir -r /work/app/requirements.txt
RUN chmod 755 /work/app/run_bench.sh /work/app/run_bench_hf.sh /work/app/main.py

# 結果書き出し用
RUN mkdir -p /results /work/app

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["sleep", "infinity"]