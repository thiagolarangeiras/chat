package com.example.chat.repositories;

import com.example.chat.models.Comentario;
import com.example.chat.models.Forum;
import com.example.chat.models.Topico;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicoRepository extends JpaRepository<Topico, Integer> {
    Page<Topico> findByidForum(Integer idForum, Pageable pageable);
    Page<Topico> findByTituloContaining(String titulo, Pageable pageable);
    Page<Topico> findByCorpoContaining(String corpo, Pageable pageable);
}
