.PHONY: all format lint test tests test_watch integration_tests help

all: help

run:
	python3 promptop/prototype.py

coverage:
	poetry run pytest --cov \
		--cov-config=.coveragerc \
		--cov-report xml \
		--cov-report term-missing:skip-covered

format:
	poetry run black .
	poetry run ruff --select I --fix .

PYTHON_FILES=.
lint: PYTHON_FILES=.
lint_diff: PYTHON_FILES=$(shell git diff --name-only --diff-filter=d master | grep -E '\.py$$')

lint lint_diff:
	poetry run mypy $(PYTHON_FILES)
	poetry run black $(PYTHON_FILES) --check
	poetry run ruff .

test:
	poetry run pytest tests/unit_tests

tests:
	poetry run pytest tests/unit_tests

test_watch:
	poetry run ptw --now . -- tests/unit_tests

integration_tests:
	poetry run pytest tests/integration_tests

help:
	@echo '----'
	@echo 'coverage            - run unit tests and generate coverage report'
	@echo 'docs_build          - build the documentation'
	@echo 'docs_clean          - clean the documentation build artifacts'
	@echo 'docs_linkcheck      - run linkchecker on the documentation'
	@echo 'format              - run code formatters'
	@echo 'lint                - run linters'
	@echo 'test                - run unit tests'
	@echo 'test_watch          - run unit tests in watch mode'
	@echo 'integration_tests   - run integration tests'
	@echo 'docker_tests        - run unit tests in docker'
