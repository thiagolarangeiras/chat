package com.example.chat.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("teste")
public class TesteController {
    @GetMapping
    public ResponseEntity<Object> testar() {
        return ResponseEntity.ok("Validado");
    }
}