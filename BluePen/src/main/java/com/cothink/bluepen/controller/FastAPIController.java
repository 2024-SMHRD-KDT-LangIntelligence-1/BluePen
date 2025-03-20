package com.cothink.bluepen.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
public class FastAPIController {
    private final WebClient webClient;

    public FastAPIController() {
        this.webClient = WebClient.builder().baseUrl("http://0.0.0.0:8000").build();
    }

    @GetMapping("/fast.do")
    public Mono<String> fastDo(@RequestParam("text") String text) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("sentence", text)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }
}