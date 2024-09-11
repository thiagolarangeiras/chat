package com.example.chat.dtos;

public record UsuarioGetDto(
        Integer id,
        String nome,
        String email
) { }