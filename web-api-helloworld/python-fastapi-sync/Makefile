PYTHON = .venv/bin/python
PIP = .venv/bin/pip

.PHONY:

.venv:
	python -m venv .venv
	$(PIP) install --upgrade pip

clean:
	rm -rf .venv

requirements.txt: .venv
	$(PIP) install -r requirements.in
	$(PIP) freeze > requirements.txt

requirements-dev.txt: .venv
	$(PIP) install -r requirements-dev.in
	$(PIP) freeze > requirements-dev.txt

install: .venv requirements.txt
	$(PIP) install -r requirements.txt

install-dev: .venv requirements-dev.txt
	$(PIP) install -r requirements-dev.txt

