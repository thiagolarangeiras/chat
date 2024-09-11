package com.example.chat.controllers;

import java.util.List;
import java.util.stream.Collectors;

import com.example.chat.dtos.*;
import com.example.chat.models.Comentario;
import com.example.chat.models.Forum;
import com.example.chat.models.Topico;
import com.example.chat.models.Usuario;
import com.example.chat.repositories.ComentarioRepository;
import com.example.chat.repositories.TopicoRepository;
import com.example.chat.repositories.UsuarioRepository;
import io.micrometer.common.lang.Nullable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("topico")
public class TopicoController {
    private TopicoRepository topicRepository;
    private UsuarioRepository usuarioRepository;
    public TopicoController(TopicoRepository topicRepository, UsuarioRepository usuarioRepository){
        this.topicRepository = topicRepository;
        this.usuarioRepository= usuarioRepository;
    }

    @PostMapping
    public ResponseEntity<Object> inserirTopico(@RequestBody TopicoPostDto dto) {
        Topico topico = Topico.dtoToEntity(dto, 1);
        topico = topicRepository.save(topico);
        return ResponseEntity.status(HttpStatus.OK).body(Topico.entityToDto(topico));
    }

    public TopicoGetDto colocarUsuario(Topico topico){
        Usuario user = usuarioRepository.findById(topico.getIdUsuario()).get();
        UsuarioGetDto userDto = Usuario.entityToDto(user);
        return Topico.entityToDto(topico, userDto);
    }

    @GetMapping
    public ResponseEntity<Object> pegarIdForum(
            @Nullable @RequestParam("id-forum") Integer idForum,
            @Nullable @RequestParam String search,
            @RequestParam int page,
            @RequestParam int count
    ) {
        if(idForum != null){
            Pageable pageable = PageRequest.of(page, count);
            List<TopicoGetDto> topicoDtos = topicRepository.findByidForum(idForum, pageable)
                    .stream()
                    .map(this::colocarUsuario)
                    .toList();
            return ResponseEntity.ok(topicoDtos);
        } else if(search != null) {
            Pageable pageable = PageRequest.of(page, count/2);
            List<TopicoGetDto> topicoDto = topicRepository.findByTituloContaining(search, pageable)
                    .stream()
                    .map(this::colocarUsuario)
                    .collect(Collectors.toList());

            topicoDto.addAll(topicRepository.findByCorpoContaining(search, pageable)
                    .stream()
                    .map(this::colocarUsuario)
                    .collect(Collectors.toList())
            );
            return ResponseEntity.ok(topicoDto);
        }
        Pageable pageable = PageRequest.of(page, count);
        List<TopicoGetDto> topicoDto = topicRepository.findAll(pageable)
                .stream()
                .map(this::colocarUsuario)
                .toList();
        return ResponseEntity.ok(topicoDto);
    }


    @GetMapping("{id-topico}")
    public ResponseEntity<Object> pegar(@PathVariable("id-topico") Integer idTopico) {
        Topico topico = topicRepository.findById(idTopico).get();
        TopicoGetDto dto = colocarUsuario(topico);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("{id-topico}")
    public ResponseEntity<Object> modificarNoticia(@PathVariable("id-topico") Integer idTopico, @RequestBody TopicoPutDto dto) {
        if (topicRepository.findById(idTopico).isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Topico não existe");
        }
        Topico topico = topicRepository.findById(idTopico).get();
        topico.updateAll(dto);
        topicRepository.save(topico);
        return ResponseEntity.ok(Topico.entityToDto(topico));
    }

    @DeleteMapping("{id-topico}")
    public ResponseEntity<String> excluirNoticia(@PathVariable("id-topico") Integer idTopico) {
        if (topicRepository.findById(idTopico).isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Topico não existe");
        }
        Topico topico = topicRepository.findById(idTopico).get();
        topico.setDeleted(true);
        topicRepository.save(topico);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Removido com sucesso");
    }
}