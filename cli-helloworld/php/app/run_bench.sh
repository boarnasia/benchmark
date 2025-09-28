#!/usr/bin/env bash
set -euo pipefail

N=${1:-1000}                                  # 反復回数（デフォルト1000）
OUT=${2:-/results/php_time.csv}              # 出力CSV
CMD=${3:-"php /work/app/main.php app:hello"}            # 実行コマンド

# CSV ヘッダ
echo "time_sec,maxrss_kb" > "$OUT"

# ループ実行：標準出力は捨て、/usr/bin/time の結果（stderr）だけ CSV に追記
for i in $(seq 1 "$N"); do
  /usr/bin/time -f "%e,%M" bash -lc "$CMD" >/dev/null 2>>"$OUT"
done

echo "wrote: $OUT"
