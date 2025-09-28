FROM php:8.3-cli

ENV LC_ALL=C.UTF-8 \
    LANG=C.UTF-8 \
    PHP_OPCACHE_VALIDATE_TIMESTAMPS=0 \
    PHP_OPCACHE_ENABLE=1 \
    PHP_OPCACHE_ENABLE_CLI=1

# システム依存ライブラリ（Octane用にSwooleを使用）
RUN apt-get update && apt-get install -y \
    git unzip curl libpng-dev libonig-dev libxml2-dev zip libzip-dev \
    libssl-dev libfreetype6-dev libjpeg62-turbo-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install mbstring bcmath exif gd pcntl pdo_mysql zip sockets \
    && pecl install swoole \
    && docker-php-ext-enable swoole \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# composer を導入（公式 composer イメージからコピー）
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# PHP設定ファイルをコピー
COPY php.ini /usr/local/etc/php/php.ini

WORKDIR /var/www/html

# スタートアップスクリプトをコピー
COPY start.sh /usr/local/bin
RUN chmod +x /usr/local/bin/start.sh

COPY ./src /var/www/html
RUN chown -R www-data:www-data /var/www/html

EXPOSE 8000

# スタートアップスクリプトを実行
CMD ["/usr/local/bin/start.sh"]
