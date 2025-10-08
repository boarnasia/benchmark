use actix_web::{web, App, HttpServer};
mod routers;
use routers::basic;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // 0.0.0.0:8000 で待ち受け（Docker 用）
    HttpServer::new(|| {
        App::new()
            .route("/ping", web::get().to(basic::ping))
            .route("/cpu-bound", web::get().to(basic::cpu_bound))
            .route("/io-bound", web::get().to(basic::io_bound))
    })
    .bind(("0.0.0.0", 8000))?
    .workers(1) // コア数に合わせる（お好みで固定可）
    .run()
    .await
}

