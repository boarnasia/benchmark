# ---- build ----
FROM rust:1-bookworm AS build

WORKDIR /work

COPY Cargo.toml Cargo.lock* ./
COPY app ./app
RUN cargo build --release

# ---- run (常駐) ----
FROM debian:bookworm-slim
ENV LC_ALL=C.UTF-8 \
    LANG=C.UTF-8

# GNU time と tini, bash を入れる
RUN apt-get update && apt-get install -y --no-install-recommends \
     jq hyperfine time tini bash procps \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /work
COPY app/ /work/app/
COPY --from=build /work/target/release/main /work/app/main
RUN chmod 755 /work/app/run_bench.sh
RUN chmod 755 /work/app/run_bench_hf.sh

CMD ["sleep", "infinity"]