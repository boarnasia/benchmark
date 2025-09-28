package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
)

func getenv(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}

func main() {
	// 本番モードに設定（デバッグログを無効化）
	gin.SetMode(gin.ReleaseMode)

	router := gin.New()
	// 必要最小限のミドルウェアのみ使用
	router.Use(gin.Recovery()) // パニック回復のみ

	// /ping → {"message":"..."}
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	router.GET("/cpu-bound", func(c *gin.Context) {
		count := 0
		for i := 0; i < 1000000; i++ {
			count++
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "CPU Bound",
		})
	})

	router.GET("/io-bound", func(c *gin.Context) {
		// Simulate IO-bound operation with sleep
		time.Sleep(100 * time.Millisecond)
		c.JSON(http.StatusOK, gin.H{
			"message": "IO Bound",
		})
	})

	// Graceful shutdown with optimized server settings
	srv := &http.Server{
		Addr:         getenv("APP_ADDR", ":8000"),
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	go func() {
		log.Printf("listening on %s", srv.Addr)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	shutdownCtx, cancel2 := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel2()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Printf("server shutdown: %v", err)
	}
}
