package com.example.chat.controllers;

import com.example.chat.dtos.ForumGetDto;
import com.example.chat.dtos.ForumPostDto;
import com.example.chat.dtos.TopicoPostDto;
import com.example.chat.models.Forum;
import com.example.chat.repositories.ForumRepository;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("forum")
public class ForumController {
    private ForumRepository forumRepository;
    public ForumController(ForumRepository forumRepository){
        this.forumRepository = forumRepository;
    }

    @PostMapping
    public ResponseEntity<Object> post(@RequestBody ForumPostDto dto) {
        Forum forum = Forum.dtoToEntity(dto, 1);
        forum = forumRepository.save(forum);
        return ResponseEntity.status(HttpStatus.OK).body(Forum.entityToDto(forum));
    }

    @GetMapping
    public ResponseEntity<Object> getAll(
            @Nullable @RequestParam String search,
            @RequestParam int page,
            @RequestParam int count
    ) {
        if(search == null) {
            Pageable pageable = PageRequest.of(page, count);
            List<ForumGetDto> forumDtos = forumRepository.findAll(pageable)
                    .stream()
                    .map(Forum::entityToDto)
                    .toList();
            return ResponseEntity.ok(forumDtos);
        }

        Pageable pageable = PageRequest.of(page, count/2);
        List<ForumGetDto> forumDescricao = forumRepository.findByDescricaoContaining(search, pageable)
                .stream()
                .map(Forum::entityToDto)
                .collect(Collectors.toList());

        List<ForumGetDto> forumNome = forumRepository.findByNomeContaining(search, pageable)
                .stream()
                .map(Forum::entityToDto)
                .collect(Collectors.toList());
        forumNome.addAll(forumDescricao);
        return ResponseEntity.ok(forumNome);
    }

    @GetMapping("{id-forum}")
    public ResponseEntity<Object> get(@PathVariable("id-forum") Integer idforum) {
        Forum forum = forumRepository.findById(idforum).get();
        ForumGetDto dto = Forum.entityToDto(forum);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("{id-forum}")
    public ResponseEntity<Object> put(@PathVariable("id-forum") Integer idforum, @RequestBody ForumPostDto dto) {
        if (forumRepository.findById(idforum).isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("forum não existe");
        }
        Forum forum = forumRepository.findById(idforum).get();
        forum.updateAll(dto);
        forumRepository.save(forum);
        return ResponseEntity.ok(Forum.entityToDto(forum));
    }

    @DeleteMapping("{id-forum}")
    public ResponseEntity<String> delete(@PathVariable("id-forum") Integer idforum) {
        if (forumRepository.findById(idforum).isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("forum não existe");
        }
        Forum forum = forumRepository.findById(idforum).get();
        forum.setDeleted(true);
        forumRepository.save(forum);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Removido com sucesso");
    }
}