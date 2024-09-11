package com.example.chat.dtos;

public record ComentarioPostDto(
    Integer idTopico,
    Integer idComentarioPai,
    String corpo
) {}