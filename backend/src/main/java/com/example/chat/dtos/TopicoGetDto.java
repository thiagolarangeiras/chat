package com.example.chat.dtos;

import java.util.Date;

public record TopicoGetDto(
        Integer id,
        Integer idUsuario,
        Integer idForum,
        String titulo,
        String corpo,
        Date data,
        UsuarioGetDto usuario
) {}