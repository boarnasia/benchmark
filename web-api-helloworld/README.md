# quick start

以下のコマンドでビルドと実行ができます。

```bash
#-- ベンチマークを取る
# このコマンドは自分では試していない、でもたぶんちゃんと動くはず
# だって作りながらベンチマークを取ってしまっていたから、、
make build

# 結果の表示
make install  # python の環境を作ってる
./venv/bin/python print_result.py
```

# くわしく

各環境内にベンチマーク用のスクリプトが入っています。
各環境のディレクトリに移動して、以下のコマンドを実行し環境を構築し起動てください。

```bash
docker compose build
docker compose up -d
```

ベンチマークは以下のコマンドで実行できます。

```bash
./benchmark.sh
```

結果は result-{ping,cpu-bound,io-bound}.txt に保存されます。

# 仕様

1. ping, cpu-bound, io-bound の3種類のベンチマークを実装する
2. 各言語でメジャーなWebフレームワークを使用する。
3. 計測は wrk を使用する

実装は [AbdullahSaquib](https://github.com/AbdullahSaquib/python-webframeworks-speed-comparison/) 氏のDjango/FastAPI/Flaskの実装を参考にしました。

# 最新の結果

```bash
$ python print_result.py
Web API Framework Benchmark Results Analyzer

    Web API Framework Benchmark Results (Requests/sec)
╭──────────────────────┬───────────┬───────────┬──────────╮
│ Framework            │      ping │ cpu-bound │ io-bound │
├──────────────────────┼───────────┼───────────┼──────────┤
│ go-gin               │ 35,865.02 │  3,732.98 │   985.73 │
│ java-springboot      │ 12,016.42 │ 12,114.57 │   991.37 │
│ node-nestjs          │  8,127.04 │  1,726.03 │   990.92 │
│ php-laravel          │    129.02 │    118.51 │   127.19 │
│ php-laravel-octane   │    160.97 │     82.01 │   109.87 │
│ python-django-async  │    794.04 │     43.33 │   668.02 │
│ python-django-ninja  │    712.22 │     42.02 │   724.55 │
│ python-django-sync   │  2,597.48 │     48.84 │    38.49 │
│ python-fastapi-async │  9,399.95 │     32.06 │   954.85 │
│ python-fastapi-sync  │  4,017.42 │     28.39 │   472.92 │
│ rust-actix           │ 74,530.59 │ 74,276.05 │   983.04 │
╰──────────────────────┴───────────┴───────────┴──────────╯

Performance Rankings
                         PING Test Rankings

  Rank   Framework              Requests/sec   Relative Performance
 ───────────────────────────────────────────────────────────────────
  1 🥇   rust-actix                74,530.59                 100.0%
  2 🥈   go-gin                    35,865.02                  48.1%
  3 🥉   java-springboot           12,016.42                  16.1%
  4      python-fastapi-async       9,399.95                  12.6%
  5      node-nestjs                8,127.04                  10.9%
  6      python-fastapi-sync        4,017.42                   5.4%
  7      python-django-sync         2,597.48                   3.5%
  8      python-django-async          794.04                   1.1%
  9      python-django-ninja          712.22                   1.0%
  10     php-laravel-octane           160.97                   0.2%
  11     php-laravel                  129.02                   0.2%

                       CPU-BOUND Test Rankings

  Rank   Framework              Requests/sec   Relative Performance
 ───────────────────────────────────────────────────────────────────
  1 🥇   rust-actix                74,276.05                 100.0%
  2 🥈   java-springboot           12,114.57                  16.3%
  3 🥉   go-gin                     3,732.98                   5.0%
  4      node-nestjs                1,726.03                   2.3%
  5      php-laravel                  118.51                   0.2%
  6      php-laravel-octane            82.01                   0.1%
  7      python-django-sync            48.84                   0.1%
  8      python-django-async           43.33                   0.1%
  9      python-django-ninja           42.02                   0.1%
  10     python-fastapi-async          32.06                   0.0%
  11     python-fastapi-sync           28.39                   0.0%

                       IO-BOUND Test Rankings

  Rank   Framework              Requests/sec   Relative Performance
 ───────────────────────────────────────────────────────────────────
  1 🥇   java-springboot              991.37                 100.0%
  2 🥈   node-nestjs                  990.92                 100.0%
  3 🥉   go-gin                       985.73                  99.4%
  4      rust-actix                   983.04                  99.2%
  5      python-fastapi-async         954.85                  96.3%
  6      python-django-ninja          724.55                  73.1%
  7      python-django-async          668.02                  67.4%
  8      python-fastapi-sync          472.92                  47.7%
  9      php-laravel                  127.19                  12.8%
  10     php-laravel-octane           109.87                  11.1%
  11     python-django-sync            38.49                   3.9%


Performance Analysis by Category
          Overall Performance Ranking (Average across all tests)
╔══════╤══════════════════════╤═════════════════╤═════════════════════════╗
║ Rank │ Framework            │ Average Req/sec │        Category         ║
╟──────┼──────────────────────┼─────────────────┼─────────────────────────╢
║ 1 🥇 │ rust-actix           │       49,929.89 │   🚀 High Performance   ║
║ 2 🥈 │ go-gin               │       13,527.91 │   🚀 High Performance   ║
║ 3 🥉 │ java-springboot      │        8,374.12 │   ⚡ Good Performance   ║
║ 4    │ node-nestjs          │        3,614.66 │   ⚡ Good Performance   ║
║ 5    │ python-fastapi-async │        3,462.29 │   ⚡ Good Performance   ║
║ 6    │ python-fastapi-sync  │        1,506.24 │   ⚡ Good Performance   ║
║ 7    │ python-django-sync   │          894.94 │ 📈 Moderate Performance ║
║ 8    │ python-django-async  │          501.80 │ 📈 Moderate Performance ║
║ 9    │ python-django-ninja  │          492.93 │ 📈 Moderate Performance ║
║ 10   │ php-laravel          │          124.91 │ 📈 Moderate Performance ║
║ 11   │ php-laravel-octane   │          117.62 │ 📈 Moderate Performance ║
╚══════╧══════════════════════╧═════════════════╧═════════════════════════╝

Summary Statistics
    ping Statistics

  Metric        Value
 ─────────────────────
  Average   13,486.38
  Median     4,017.42
  Maximum   74,530.59
  Minimum      129.02

 cpu-bound Statistics

  Metric        Value
 ─────────────────────
  Average    8,385.89
  Median        82.01
  Maximum   74,276.05
  Minimum       28.39

io-bound Statistics

  Metric     Value
 ──────────────────
  Average   640.63
  Median    724.55
  Maximum   991.37
  Minimum    38.49
  ```
