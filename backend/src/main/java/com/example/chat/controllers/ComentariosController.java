package com.example.chat.controllers;

import java.util.List;

import com.example.chat.dtos.ComentarioGetDto;
import com.example.chat.dtos.ComentarioPostDto;
import com.example.chat.dtos.ComentarioPutDto;
import com.example.chat.dtos.UsuarioGetDto;
import com.example.chat.models.Comentario;

import com.example.chat.models.Usuario;
import com.example.chat.repositories.ComentarioRepository;
import com.example.chat.repositories.TopicoRepository;

import com.example.chat.repositories.UsuarioRepository;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("comentario")
public class ComentariosController {
    private ComentarioRepository comentarioRepository;
    private TopicoRepository topicRepository;
    private UsuarioRepository usuarioRepository;
    public ComentariosController(ComentarioRepository comentarioRepository, TopicoRepository topicRepository, UsuarioRepository usuarioRepository){
        this.comentarioRepository = comentarioRepository;
        this.topicRepository = topicRepository;
        this.usuarioRepository= usuarioRepository;
    }

    @PostMapping
    public ResponseEntity<Object> post(@RequestBody ComentarioPostDto dto) {
        if (dto.idTopico() != null){
            if (topicRepository.findById(dto.idTopico()).isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Topico não existe");
            }
        } else if (dto.idComentarioPai() != null) {
            if (comentarioRepository.findById(dto.idComentarioPai()).isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comentario não existe");
            }
        }
        Comentario com = Comentario.dtoToEntity(dto, 1);
        Comentario comSalvo = comentarioRepository.save(com);
        ComentarioGetDto comSalvoDto = Comentario.entityToDto(comSalvo);
        return ResponseEntity.status(HttpStatus.OK).body(comSalvoDto);
    }

//    public void add(){
//        List<ComentarioGetDto> comDto = new ArrayList<>();
//        for(Comentario com : comPage){
//            if (com.getIdComentarioPai() != null){
//                Optional<Comentario> opCom = comentarioRepository.findById(com.getIdComentarioPai());
//                if (opCom.isPresent()){
//                    com.setComentarioPai(opCom.get());
//                }
//            }
//            comDto.add(Comentario.entityToDto(com));
//        }
//    }

    public ComentarioGetDto colocarUsuario(Comentario comentario){
        Usuario user = usuarioRepository.findById(comentario.getIdUsuario()).get();
        UsuarioGetDto userDto = Usuario.entityToDto(user);
        return Comentario.entityToDto(comentario, userDto);
    }

    @GetMapping
    public ResponseEntity<Object> pegarTodosComentario(
            @Nullable @RequestParam("id-topico") Integer idTopico,
            @Nullable @RequestParam("id-comentario") Integer idComentario,
            @Nullable @RequestParam String search,
            @RequestParam int page,
            @RequestParam int count
    ) {
        Pageable pageable = PageRequest.of(page, count);
        if (idComentario != null){
            List<ComentarioGetDto> comDto = comentarioRepository.findByIdComentarioPai(idComentario, pageable)
                    .stream()
                    .map(this::colocarUsuario)
                    .toList();
            return ResponseEntity.ok(comDto);
        }

        if (idTopico != null) {
            List<ComentarioGetDto> comDto = comentarioRepository.findByIdTopico(idTopico, pageable)
                    .stream()
                    .map(this::colocarUsuario)
                    .toList();
            return ResponseEntity.ok(comDto);
        }

        if (search != null) {
            List<ComentarioGetDto> comDto = comentarioRepository.findByCorpoContaining(search, pageable)
                    .stream()
                    .map(this::colocarUsuario)
                    .toList();
            return ResponseEntity.ok(comDto);
        }

        List<ComentarioGetDto> comDto = comentarioRepository.findAll(pageable)
                .stream()
                .map(this::colocarUsuario)
                .toList();
        return ResponseEntity.ok(comDto);
    }

    @GetMapping("{id-comentario}")
    public ResponseEntity<Object> pegarComentario(@PathVariable("id-comentario") Integer idComentario) {
        Comentario com = comentarioRepository.findById(idComentario).get();
        ComentarioGetDto dto = colocarUsuario(com);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("{id-comentario}")
    public ResponseEntity<Object> modificarComentario(@PathVariable("id-comentario") Integer idComentario, @RequestBody ComentarioPutDto dto) {
        if (comentarioRepository.findById(idComentario).isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comentario não existe");
        }
        Comentario com = comentarioRepository.findById(idComentario).get();
        com.update(dto);
        comentarioRepository.save(com);
        return ResponseEntity.ok(Comentario.entityToDto(com));
    }

    @DeleteMapping("{id-comentario}")
    public ResponseEntity<String> excluirComentario(@PathVariable("id-comentario") Integer idComentario) {
        if (comentarioRepository.findById(idComentario).isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("comentario não existe");
        }
        Comentario com = comentarioRepository.findById(idComentario).get();
        com.setDeleted(true);
        comentarioRepository.save(com);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Removido com sucesso");
    }
}