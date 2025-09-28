#!/usr/bin/env bash
# hyperfine-only benchmark script (execution time only)
# Usage:
#   run_bench_hf.sh [RUNS] [OUT_CSV] [CMD] [--warmup W] [--json OUT_JSON] [--summary OUT_SUMMARY]
# Defaults:
#   RUNS=100
#   OUT_CSV=/results/hf_time.csv           # per-run times (CSV: time_sec)
#   CMD="java -jar /work/app/target/java-cli.jar --name world --repeat 1"
#   WARMUP=3
#   OUT_JSON=/results/hf_time.json         # hyperfine raw JSON
#   OUT_SUMMARY=/results/hf_summary.csv    # summary stats CSV
#
# Notes:
# - Requires: hyperfine, jq
# - This script measures ONLY execution time. Memory/RSS is intentionally not handled here.

set -euo pipefail

RUNS=${1:-100}
OUT_CSV=${2:-/results/java_hf.csv}
CMD=${3:-"java -jar /work/app/target/java-cli.jar"}

# optional flags
WARMUP=3
OUT_JSON="/results/java_hf_time.json"

shift $(( $# > 0 ? 0 : 0 )) || true
for arg in "$@"; do
  case "$arg" in
    --warmup) shift; WARMUP="${1:-3}"; shift || true;;
    --json) shift; OUT_JSON="${1:-/results/hf_time.json}"; shift || true;;
  esac || true
done

mkdir -p "$(dirname "$OUT_CSV")" "$(dirname "$OUT_JSON")"

echo -e "\033[36m[hyperfine] runs=$RUNS warmup=$WARMUP\033[0m"
echo -e "\033[36m[hyperfine] cmd: $CMD\033[0m"
echo -e "\033[36m[hyperfine] json: $OUT_JSON\033[0m"
echo -e "\033[36m[hyperfine] per-run CSV: $OUT_CSV\033[0m"

# Run hyperfine (use default shell so complex commands/quoting work)
hyperfine --warmup "$WARMUP" -r "$RUNS" --export-json "$OUT_JSON" "$CMD"

# Convert to per-run CSV (time in seconds)
echo "time_sec" > "$OUT_CSV"
jq -r '.results[0].times[]' < "$OUT_JSON" >> "$OUT_CSV"

echo -e "\033[32m[hyperfine] done. per-run -> $OUT_CSV\033[0m"
