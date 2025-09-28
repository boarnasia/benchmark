# quick start

以下のコマンドでビルドと実行ができます。

```bash
make build
make run
# 繰り返しの回数を指定
make run ITERS=100

# サマリを出力
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python print_result.py
```

# くわしく

各環境(node, php, python, etc...)内にベンチマーク用のスクリプトが入っています。
各環境のディレクトリに移動して、以下のコマンドを実行し環境を構築し起動てください。

```bash
docker compose build
docker compose up -d
```

ベンチマークは以下のコマンドで実行できます。

```bash
docker compose exec bench /work/app/run_bench.sh
# 引数は任意です。上記は 1000 回実行し、結果を /results/node_time.csv に保存し、コマンドには node /work/app/main.js を指定します。
docker compose exec bench /work/app/run_bench.sh 1000 /results/node_time.csv "node /work/app/main.js"
```

結果は `<root>/cli-helloworld/results/` に CSV 形式で保存されます。
node_time.csv, php_time.csv, python_time.csv のように環境ごとにファイルが分かれています。

# 仕様

1. 実務で一般的な構成で組む
2. 各言語で最もメジャーなCLIフレームワークを使用する。 例: python なら click, node なら commander
3. 実行ファイルの出力フォーマットは: Hello, world!
4. 計測は GNU time, hyperfine を使用し、実行時間と最大常駐メモリを計測する

# 最新の結果

```bash
$ python print_result.py
            実行時間統計 (秒) - 平均値昇順

  言語     平均       最大       最小       中央値
 ────────────────────────────────────────────────────
  rust     0.000563   0.001016   0.000462   0.000528
  php      0.020232   0.030813   0.018302   0.019787
  node     0.02917    0.038286   0.026705   0.02897
  python   0.031873   0.044933   0.029461   0.031165
  java     0.113149   0.127744   0.109075   0.112048


        メモリ使用量統計 (KB) - 平均値昇順

  言語     平均       最大      最小      中央値
 ─────────────────────────────────────────────────
  rust     3244.96    3384.0    3088.0    3240.0
  python   13480.4    13580.0   13372.0   13452.0
  php      27296.92   27628.0   26972.0   27256.0
  node     48513.6    50940.0   46584.0   48672.0
  java     55826.52   57596.0   55196.0   55504.0
  ```