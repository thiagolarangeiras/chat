package com.example.chat.models;

import com.example.chat.dtos.TopicoGetDto;
import com.example.chat.dtos.TopicoPostDto;
import com.example.chat.dtos.TopicoPutDto;
import com.example.chat.dtos.UsuarioGetDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Entity
@Table(name = "topicos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Topico {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer idUsuario;
    private Integer idForum;
    private String titulo;
    private String corpo;
    private Date data;
    private boolean deleted;

    public static Topico dtoToEntity(TopicoPostDto dto, Integer idUsuario) {
        Topico topico = new Topico();
        topico.idUsuario = idUsuario;
        topico.idForum = dto.idForum();
        topico.titulo = dto.titulo();
        topico.corpo = dto.corpo();
        topico.data = new Date();
        topico.deleted = false;
        return topico;
    }

    public static TopicoGetDto entityToDto(Topico topico){
        return entityToDto(topico, null);
    }

    public static TopicoGetDto entityToDto(Topico topico, UsuarioGetDto usDto){
        if (topico.deleted){
            return new TopicoGetDto(
                topico.id,
                topico.idUsuario,
                topico.idForum,
                null,
                null,
                topico.data,
                usDto
            );
        }
        return new TopicoGetDto(
            topico.id,
            topico.idUsuario,
            topico.idForum,
            topico.titulo,
            topico.corpo,
            topico.data,
            usDto
        );
    }

    public void updateAll(TopicoPutDto dto){
        this.titulo = dto.titulo();
        this.corpo = dto.corpo();
    }
}