package com.example.chat.dtos;

public record TopicoPostDto(
    Integer idForum,
    String titulo,
    String corpo
) {}