package com.example.chat.repositories;

import com.example.chat.models.Forum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumRepository extends JpaRepository<Forum, Integer> {
    Page<Forum> findByNomeContaining(String nome, Pageable pageable);
    Page<Forum> findByDescricaoContaining(String descricao, Pageable pageable);
}