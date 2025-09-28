ITERS = 100

DC = docker compose

build:
	cd node && $(DC) build
	cd php && $(DC) build
	cd python && $(DC) build
	cd rust && $(DC) build
	cd java && $(DC) build

run:
	@echo "\033[33m==> Run Node\033[0m"
	cd node && $(DC) up -d && $(DC) exec bench /work/app/run_bench.sh $(ITERS) && $(DC) exec bench /work/app/run_bench_hf.sh $(ITERS) && $(DC) down
	@echo "\033[33m==> Run PHP\033[0m"
	cd php && $(DC) up -d && $(DC) exec bench /work/app/run_bench.sh $(ITERS) && $(DC) exec bench /work/app/run_bench_hf.sh $(ITERS) && $(DC) down
	@echo "\033[33m==> Run Python\033[0m"
	cd python && $(DC) up -d && $(DC) exec bench /work/app/run_bench.sh $(ITERS) && $(DC) exec bench /work/app/run_bench_hf.sh $(ITERS) && $(DC) down
	@echo "\033[33m==> Run Rust\033[0m"
	cd rust && $(DC) up -d && $(DC) exec bench /work/app/run_bench.sh $(ITERS) && $(DC) exec bench /work/app/run_bench_hf.sh $(ITERS) && $(DC) down
	@echo "\033[33m==> Run Java\033[0m"
	cd java && $(DC) up -d && $(DC) exec bench /work/app/run_bench.sh $(ITERS) && $(DC) exec bench /work/app/run_bench_hf.sh $(ITERS) && $(DC) down