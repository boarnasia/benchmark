//! Basic API routes

use actix_web::{HttpResponse, Responder};
use serde::Serialize;
use std::time::Duration;

#[derive(Serialize)]
struct Msg<'a> {
    message: &'a str,
}

pub async fn ping() -> impl Responder {
    HttpResponse::Ok().json(Msg { message: "pong" })
}

pub async fn cpu_bound() -> impl Responder {
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

pub async fn io_bound() -> impl Responder {
    // 100ms の I/O 待ちを模擬
    actix_web::rt::time::sleep(Duration::from_millis(100)).await;
    HttpResponse::Ok().json(Msg { message: "IO Bound" })
}


#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{http::StatusCode, test, web, App};
    use serde_json::{json, Value};

    // /ping のテスト
    #[actix_web::test]
    async fn test_ping() {
        let app = test::init_service(App::new().route("/ping", web::get().to(ping))).await;

        let req = test::TestRequest::get().uri("/ping").to_request();
        let resp = test::call_service(&app, req).await;
        assert_eq!(resp.status(), StatusCode::OK);

        let body: Value = test::read_body_json(resp).await;
        assert_eq!(body, json!({ "message": "pong" }));
    }

    // /cpu のテスト
    #[actix_web::test]
    async fn test_cpu_bound() {
        let app = test::init_service(App::new().route("/cpu", web::get().to(cpu_bound))).await;

        let req = test::TestRequest::get().uri("/cpu").to_request();
        let resp = test::call_service(&app, req).await;
        assert_eq!(resp.status(), StatusCode::OK);

        let body: Value = test::read_body_json(resp).await;
        assert_eq!(body["message"], "CPU Bound");
        assert!(body["count"].is_number());
    }

    // /io のテスト（100ms 待ちあり）
    #[actix_web::test]
    async fn test_io_bound() {
        let app = test::init_service(App::new().route("/io", web::get().to(io_bound))).await;

        let req = test::TestRequest::get().uri("/io").to_request();
        let resp = test::call_service(&app, req).await;
        assert_eq!(resp.status(), StatusCode::OK);

        let body: Value = test::read_body_json(resp).await;
        assert_eq!(body, json!({ "message": "IO Bound" }));
    }
}