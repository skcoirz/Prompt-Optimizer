.PHONY: all format lint test integration_tests help

all: help

run:
	python3 promptop/example.py

coverage:
	poetry run pytest --cov \
		--cov-config=.coveragerc \
		--cov-report xml \
		--cov-report term-missing:skip-covered

format:
	poetry run black .
	poetry run ruff --select I --fix .
	deno fmt ./ui/

PYTHON_FILES=.
lint: PYTHON_FILES=.
lint_diff: PYTHON_FILES=$(shell git diff --name-only --diff-filter=d master | grep -E '\.py$$')

lint lint_diff:
	poetry run mypy $(PYTHON_FILES)
	poetry run black $(PYTHON_FILES) --check
	poetry run ruff . --fix
	deno lint ./ui/

test:
	poetry run pytest tests/unit_tests

integration_tests:
	poetry run pytest tests/integration_tests

help:
	@echo '----'
	@echo 'coverage            - run unit tests and generate coverage report'
	@echo 'format              - run code formatters'
	@echo 'lint                - run linters'
	@echo 'test                - run unit tests'
	@echo 'integration_tests   - run integration tests'
