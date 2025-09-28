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
