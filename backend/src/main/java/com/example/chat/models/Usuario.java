package com.example.chat.models;

import com.example.chat.dtos.UsuarioGetDto;
import com.example.chat.dtos.UsuarioPostDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique = true)
    private String nome;

    @Column(unique = true)
    private String email;

    private String senha;
    private boolean deleted;

    public static Usuario dtoToEntity(UsuarioPostDto dto) {
        Usuario usuario = new Usuario();
        usuario.nome = dto.nome();
        usuario.email = dto.email();
        usuario.senha = new BCryptPasswordEncoder().encode(dto.senha());
        return usuario;
    }

    public static UsuarioGetDto entityToDto(Usuario usuario){
        if (usuario.deleted){
            return new UsuarioGetDto(
                usuario.id,
                null,
                null
            );
        }

        return new UsuarioGetDto(
            usuario.id,
            usuario.nome,
            usuario.email
        );
    }

    public void updateAll(UsuarioPostDto dto){
        this.nome = dto.nome();
        this.email = dto.email();
        this.senha = dto.senha();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return nome;
    }

    @Override
    public String getPassword() {
        return senha;
    }
}