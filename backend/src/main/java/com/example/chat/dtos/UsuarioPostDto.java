package com.example.chat.dtos;

import lombok.Builder;

@Builder
public record UsuarioPostDto(
        String nome,
        String email,
        String senha
) { }