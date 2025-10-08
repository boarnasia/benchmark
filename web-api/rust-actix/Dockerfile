# ---- build ----
FROM rust:1-bookworm AS build

WORKDIR /work
# 依存キャッシュ用に先にマニフェストだけコピーしてダミーをビルド
COPY Cargo.toml Cargo.lock* ./
RUN mkdir -p app && printf 'fn main(){}' > app/main.rs && cargo build --release

# 本体コピー & リリースビルド
COPY app ./app
RUN cargo build --release

# ---- run (常駐) ----
FROM debian:bookworm-slim
ENV LC_ALL=C.UTF-8 \
    LANG=C.UTF-8

WORKDIR /work

# 実行バイナリのみコピー
COPY --from=build /work/target/release/main /usr/local/bin/server


EXPOSE 8000
CMD ["server"]

