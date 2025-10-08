use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::Serialize;
use std::time::Duration;

#[derive(Serialize)]
struct Msg<'a> {
    message: &'a str,
}

async fn ping() -> impl Responder {
    HttpResponse::Ok().json(Msg { message: "pong" })
}

async fn cpu_bound() -> impl Responder {
    // 最適化で消えないように結果を返す
    let mut count: u64 = 0;
    for _ in 0..1_000_000 {
        count = count.wrapping_add(1);
    }
    HttpResponse::Ok().json(serde_json::json!({
        "message": "CPU Bound",
        "count": count
    }))
}

async fn io_bound() -> impl Responder {
    // 100ms の I/O 待ちを模擬
    actix_web::rt::time::sleep(Duration::from_millis(20)).await;
    HttpResponse::Ok().json(Msg { message: "IO Bound" })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // 0.0.0.0:8000 で待ち受け（Docker 用）
    HttpServer::new(|| {
        App::new()
            .route("/ping", web::get().to(ping))
            .route("/cpu-bound", web::get().to(cpu_bound))
            .route("/io-bound", web::get().to(io_bound))
    })
    .bind(("0.0.0.0", 8000))?
    .workers(1) // コア数に合わせる（お好みで固定可）
    .run()
    .await
}

