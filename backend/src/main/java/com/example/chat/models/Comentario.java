package com.example.chat.models;

import com.example.chat.dtos.ComentarioGetDto;
import com.example.chat.dtos.ComentarioPostDto;
import com.example.chat.dtos.ComentarioPutDto;
import com.example.chat.dtos.UsuarioGetDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "comentarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer idUsuario;
    private Integer idTopico;
    private Integer idComentarioPai;
    private String corpo;
    private LocalDateTime data;
    private boolean deleted;

    @Transient
    private Topico topico;
    @Transient
    private Comentario comentarioPai;
    @Transient
    private List<Comentario> comentariosFilhos;

    public static Comentario dtoToEntity(ComentarioPostDto dto, Integer idUsuario) {
        Comentario comentario = new Comentario();
        comentario.idUsuario = idUsuario;
        comentario.idTopico = dto.idTopico();
        comentario.idComentarioPai = dto.idComentarioPai();
        comentario.corpo = dto.corpo();
        comentario.data = LocalDateTime.now();
        comentario.deleted = false;
        return comentario;
    }

    public static ComentarioGetDto entityToDto(Comentario comentario){
        return entityToDto(comentario, null);
    }

    public static ComentarioGetDto entityToDto(Comentario comentario, UsuarioGetDto userDto){
        if (comentario.deleted){
            return new ComentarioGetDto(
                comentario.id,
                comentario.idUsuario,
                comentario.idTopico,
                comentario.idComentarioPai,
                null,
                comentario.data,
                userDto,
                null,
                null,
                null
            );
        }

        return new ComentarioGetDto(
            comentario.id,
            comentario.idUsuario,
            comentario.idTopico,
            comentario.idComentarioPai,
            comentario.corpo,
            comentario.data,
            userDto,
            null,
            null,
            null
        );
    }

    public void update(ComentarioPutDto dto){
        this.corpo = dto.corpo();
    }
}