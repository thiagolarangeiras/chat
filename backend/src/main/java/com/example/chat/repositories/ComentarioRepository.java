package com.example.chat.repositories;

import com.example.chat.models.Comentario;
import com.example.chat.models.Forum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    Page<Comentario> findByIdTopico(Integer idTopico, Pageable pageable);
    Page<Comentario> findByIdComentarioPai(Integer idComentarioPai, Pageable pageable);
    Page<Comentario> findByCorpoContaining(String corpo, Pageable pageable);
}
