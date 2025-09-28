FROM php:8.3-cli-bookworm

ENV LC_ALL=C.UTF-8 \
    LANG=C.UTF-8 \
    PHP_OPCACHE_VALIDATE_TIMESTAMPS=0 \
    PHP_OPCACHE_ENABLE=1 \
    PHP_OPCACHE_ENABLE_CLI=1

# GNU time, tini, bash, git, unzip を導入
RUN apt-get update && apt-get install -y --no-install-recommends \
      jq hyperfine time tini bash git unzip procps \
    && rm -rf /var/lib/apt/lists/*

# composer を導入（公式 composer イメージからコピー）
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /work

# アプリ配置用ディレクトリ & 結果出力先
RUN mkdir -p /work /results
COPY app/ /work/app/
RUN cd /work/app && composer install --no-dev --optimize-autoloader
RUN chmod 755 /work/app/run_bench.sh /work/app/main.php
RUN chmod 755 /work/app/run_bench_hf.sh

# PID1 ゾンビ回収のため tini、コンテナは起動しっぱなし
ENTRYPOINT ["/usr/bin/tini","--"]
CMD ["sleep","infinity"]
