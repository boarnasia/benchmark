PYTHON = python
PIP = .venv/bin/pip

.venv:
	$(PYTHON) -m venv .venv
	.venv/bin/pip install --upgrade pip

requirements.txt: .venv
	$(PIP) install -r requirements.in
	$(PIP) freeze >  requirements.txt

install: requirements.txt
	$(PIP) install -r requirements.txt

build: 
	cd go-gin && docker compose up && ./benchmark.sh
	cd java-springboot && docker compose up && ./benchmark.sh
	cd node-nestjs && docker compose up && ./benchmark.sh
	cd php-laravel && docker compose up && ./benchmark.sh
	cd php-laravel-octane && docker compose up && ./benchmark.sh
	cd python-django-async && docker compose up && ./benchmark.sh
	cd python-django-sync && docker compose up && ./benchmark.sh
	cd python-django-ninja && docker compose up && ./benchmark.sh
	cd python-fastapi-async && docker compose up && ./benchmark.sh
	cd python-fastapi-sync && docker compose up && ./benchmark.sh
	cd rust-actix && docker compose up && ./benchmark.sh
