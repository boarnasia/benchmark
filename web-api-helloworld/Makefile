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
	cd go-gin && docker compose up -d && ./benchmark.sh && docker compose down
	cd java-springboot && docker compose up -d && ./benchmark.sh && docker compose down
	cd node-nestjs && docker compose up -d && ./benchmark.sh && docker compose down
	cd php-laravel && docker compose up -d && ./benchmark.sh && docker compose down
	cd php-laravel-octane && docker compose up -d && ./benchmark.sh && docker compose down
	cd python-django-async && docker compose up -d && ./benchmark.sh && docker compose down
	cd python-django-sync && docker compose up -d && ./benchmark.sh && docker compose down
	cd python-django-ninja && docker compose up -d && ./benchmark.sh && docker compose down
	cd python-fastapi-async && docker compose up -d && ./benchmark.sh && docker compose down
	cd python-fastapi-sync && docker compose up -d && ./benchmark.sh && docker compose down
	cd rust-actix && docker compose up -d && ./benchmark.sh && docker compose down
