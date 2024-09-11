package com.example.chat.models;

import com.example.chat.dtos.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "forums")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Forum {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer idDono;
    private String nome;
    private String descricao;
    private Date dataCriacao;
    private boolean deleted;

    public static Forum dtoToEntity(ForumPostDto dto, Integer idUsuario) {
        Forum forum = new Forum();
        forum.idDono = idUsuario;
        forum.nome = dto.nome();
        forum.descricao = dto.descricao();
        forum.dataCriacao = new Date();
        forum.deleted = false;
        return forum;
    }

    public static ForumGetDto entityToDto(Forum forum){
        if (forum.deleted){
            return new ForumGetDto(
                forum.id,
                null,
                null
            );
        }
        return new ForumGetDto(
                forum.id,
                forum.nome,
                forum.descricao
        );
    }

    public void updateAll(ForumPostDto dto){
        this.nome = dto.nome();
        this.descricao = dto.descricao();
    }
}