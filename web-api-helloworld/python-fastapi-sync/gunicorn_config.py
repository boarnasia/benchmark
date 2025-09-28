workers = 4
bind = "0.0.0.0:8000"
worker_class = "uvicorn.workers.UvicornWorker"  # FastAPIにはUvicornWorkerが必要
accesslog = None  # アクセスログ無効
loglevel = "error"  # ログレベルをさらに上げる
preload_app = True