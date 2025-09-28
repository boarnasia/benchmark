#!/usr/bin/env bash
set -euo pipefail

N=${1:-1000}                                        # iterations (default 1000)
OUT=${2:-/results/java_time.csv}                    # output CSV
CMD=${3:-"java -jar /work/app/target/java-cli.jar"}

echo "time_sec,maxrss_kb" > "$OUT"
for i in $(seq 1 "$N"); do
  /usr/bin/time -f "%e,%M" bash -lc "$CMD" >/dev/null 2>>"$OUT"
done
echo "wrote: $OUT"
