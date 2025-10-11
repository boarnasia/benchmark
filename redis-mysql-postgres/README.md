# redis-mysql-postgre benchmark

## Quickstart

```bash
cp .env.example .env
docker compose up -d
bun install
make migrate
bun main.ts
bun main.ts --filter postgres
```

## Benchmark Results

```
Redisに10万件の文字列を追加(set), 247 ms, success: true
Redisに10万件の文字列を追加(setex), 390 ms, success: true
MySQLに10万件の文字列を追加(upsert), 1176 ms, success: true
PostgreSQLに10万件の文字列を追加(upsert), 3579 ms, success: true
```