FROM python:3.9

ENV PYTHONUNBUFFERED=1 \
    POETRY_VERSION=1.1.6 \
    SHELL=/bin/bash \
    LC_ALL=en_US.UTF-8 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    PYTHONFAULTHANDLER=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    EBIAN_FRONTEND=noninteractive

RUN apt-get update -y && \
    apt-get install -y \
    locales \
    && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
    && locale-gen \
    && apt-get install --auto-remove -y \
    binutils \
    libproj-dev \
    gdal-bin \
    curl \
    libcurl4-openssl-dev \
    locales \
    libgeos-dev\
    libyaml-dev\
    libgnutls28-dev\
    apt-transport-https && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
# Requirements have to be pulled and installed here, otherwise caching won't work
COPY poetry.lock pyproject.toml /app/

RUN pip install "poetry==$POETRY_VERSION" \
    && poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

RUN groupadd -r django \
    && useradd -r -g django django

COPY . /app
RUN chown -R django /app

COPY ./docker/django/gunicorn.sh /gunicorn.sh
COPY ./docker/django/entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r//' /entrypoint.sh \
    && sed -i 's/\r//' /gunicorn.sh \
    && chmod +x /entrypoint.sh \
    && chown django /entrypoint.sh \
    && chmod +x /gunicorn.sh \
    && chown django /gunicorn.sh

WORKDIR /app

ENTRYPOINT ["/entrypoint.sh"]
