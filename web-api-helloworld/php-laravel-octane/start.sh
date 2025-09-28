#!/bin/bash
set -e

# 環境変数を明示的に設定
export OCTANE_SERVER=swoole
export APP_ENV=production

echo "Setting up production environment..."

# 依存関係のインストール（本番用）
echo "Installing production dependencies..."
composer install --optimize-autoloader --no-dev --no-interaction

# ログディレクトリの権限確保
mkdir -p storage/logs
chmod 755 storage/logs

# データベースファイルの権限修正
echo "Setting up database permissions..."
if [ -f "database/database.sqlite" ]; then
    chmod 666 database/database.sqlite
    echo "SQLite database permissions set to 666"
fi
chmod 755 database/
chmod 755 storage/
chmod -R 755 storage/framework/sessions/

# アプリケーションキーの設定確認・生成
echo "Checking application key..."
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:your-app-key-here" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

echo "Current APP_KEY: $APP_KEY"

# 本番環境用の最適化
echo "Optimizing for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# データベースマイグレーション
echo "Running database migrations..."
php artisan migrate --force

# Laravel Octane (Swoole) を本番モードで起動
echo "Starting Laravel Octane with Swoole (Production Mode)..."
exec php artisan octane:start \
    --server=swoole \
    --host=0.0.0.0 \
    --port=8000 \
    --workers=4 \
    --task-workers=6 \
    --max-requests=1000
