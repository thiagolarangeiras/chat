package com.example.chat.dtos;

import java.time.LocalDateTime;
import java.util.List;

public record ComentarioGetDto(
    Integer id,
    Integer idUsuario,
    Integer idTopico,
    Integer idComentarioPai,
    String corpo,
    LocalDateTime data,
    UsuarioGetDto usuario,
    TopicoGetDto topico,
    ComentarioGetDto comentarioPai,
    List<ComentarioGetDto> comentariosFilhos
) {}