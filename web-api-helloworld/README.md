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
│ go-gin               │ 35,865.02 │  3,732.98 │   451.22 │
│ java-springboot      │ 11,029.70 │ 10,235.58 │   902.67 │
│ node-nestjs          │  6,977.23 │  1,516.23 │   904.41 │
│ php-laravel          │    148.03 │    142.40 │   131.28 │
│ php-laravel-octane   │    223.78 │     92.01 │   116.44 │
│ python-django-async  │    697.58 │     40.80 │   749.94 │
│ python-django-ninja  │    631.55 │     37.27 │   674.58 │
│ python-django-sync   │  2,278.54 │     44.54 │    34.45 │
│ python-fastapi-async │  8,425.74 │     28.92 │   870.69 │
│ python-fastapi-sync  │  3,534.99 │     24.79 │   728.50 │
│ rust-actix           │ 71,393.68 │ 66,897.72 │   879.20 │
╰──────────────────────┴───────────┴───────────┴──────────╯

Performance Rankings
                         PING Test Rankings

  Rank   Framework              Requests/sec   Relative Performance
 ───────────────────────────────────────────────────────────────────
  1 🥇   rust-actix                71,393.68                 100.0%
  2 🥈   go-gin                    35,865.02                  50.2%
  3 🥉   java-springboot           11,029.70                  15.4%
  4      python-fastapi-async       8,425.74                  11.8%
  5      node-nestjs                6,977.23                   9.8%
  6      python-fastapi-sync        3,534.99                   5.0%
  7      python-django-sync         2,278.54                   3.2%
  8      python-django-async          697.58                   1.0%
  9      python-django-ninja          631.55                   0.9%
  10     php-laravel-octane           223.78                   0.3%
  11     php-laravel                  148.03                   0.2%

                       CPU-BOUND Test Rankings

  Rank   Framework              Requests/sec   Relative Performance
 ───────────────────────────────────────────────────────────────────
  1 🥇   rust-actix                66,897.72                 100.0%
  2 🥈   java-springboot           10,235.58                  15.3%
  3 🥉   go-gin                     3,732.98                   5.6%
  4      node-nestjs                1,516.23                   2.3%
  5      php-laravel                  142.40                   0.2%
  6      php-laravel-octane            92.01                   0.1%
  7      python-django-sync            44.54                   0.1%
  8      python-django-async           40.80                   0.1%
  9      python-django-ninja           37.27                   0.1%
  10     python-fastapi-async          28.92                   0.0%
  11     python-fastapi-sync           24.79                   0.0%

                       IO-BOUND Test Rankings

  Rank   Framework              Requests/sec   Relative Performance
 ───────────────────────────────────────────────────────────────────
  1 🥇   node-nestjs                  904.41                 100.0%
  2 🥈   java-springboot              902.67                  99.8%
  3 🥉   rust-actix                   879.20                  97.2%
  4      python-fastapi-async         870.69                  96.3%
  5      python-django-async          749.94                  82.9%
  6      python-fastapi-sync          728.50                  80.5%
  7      python-django-ninja          674.58                  74.6%
  8      go-gin                       451.22                  49.9%
  9      php-laravel                  131.28                  14.5%
  10     php-laravel-octane           116.44                  12.9%
  11     python-django-sync            34.45                   3.8%


Performance Analysis by Category
          Overall Performance Ranking (Average across all tests)
╔══════╤══════════════════════╤═════════════════╤═════════════════════════╗
║ Rank │ Framework            │ Average Req/sec │        Category         ║
╟──────┼──────────────────────┼─────────────────┼─────────────────────────╢
║ 1 🥇 │ rust-actix           │       46,390.20 │   🚀 High Performance   ║
║ 2 🥈 │ go-gin               │       13,349.74 │   🚀 High Performance   ║
║ 3 🥉 │ java-springboot      │        7,389.32 │   ⚡ Good Performance   ║
║ 4    │ node-nestjs          │        3,132.62 │   ⚡ Good Performance   ║
║ 5    │ python-fastapi-async │        3,108.45 │   ⚡ Good Performance   ║
║ 6    │ python-fastapi-sync  │        1,429.43 │   ⚡ Good Performance   ║
║ 7    │ python-django-sync   │          785.84 │ 📈 Moderate Performance ║
║ 8    │ python-django-async  │          496.11 │ 📈 Moderate Performance ║
║ 9    │ python-django-ninja  │          447.80 │ 📈 Moderate Performance ║
║ 10   │ php-laravel-octane   │          144.08 │ 📈 Moderate Performance ║
║ 11   │ php-laravel          │          140.57 │ 📈 Moderate Performance ║
╚══════╧══════════════════════╧═════════════════╧═════════════════════════╝

Summary Statistics
    ping Statistics

  Metric        Value
 ─────────────────────
  Average   12,836.89
  Median     3,534.99
  Maximum   71,393.68
  Minimum      148.03

 cpu-bound Statistics

  Metric        Value
 ─────────────────────
  Average    7,526.66
  Median        92.01
  Maximum   66,897.72
  Minimum       24.79

io-bound Statistics

  Metric     Value
 ──────────────────
  Average   585.76
  Median    728.50
  Maximum   904.41
  Minimum    34.45
  ```
