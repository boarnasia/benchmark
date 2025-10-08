package com.example.benchmarkapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class BenchmarkController {

    @GetMapping("/ping")
    public ResponseEntity<Map<String, String>> ping() {
        return ResponseEntity.ok(Map.of("message", "pong"));
    }

    @GetMapping("/cpu-bound")
    public ResponseEntity<Map<String, String>> cpuBound() {
        int count = 0;
        for (int i = 0; i < 1000000; i++) {
            count++;
        }
        return ResponseEntity.ok(Map.of("message", "CPU Bound"));
    }

    @GetMapping("/io-bound")
    public ResponseEntity<Map<String, String>> ioBound() throws InterruptedException {
        // Simulate IO-bound operation with sleep
        Thread.sleep(20);
        return ResponseEntity.ok(Map.of("message", "IO Bound"));
    }
}