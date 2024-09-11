package com.example.chat.security;

import com.example.chat.dtos.UsuarioGetDto;
import com.example.chat.dtos.UsuarioLoginDto;
import com.example.chat.dtos.UsuarioPostDto;
import com.example.chat.models.Usuario;
import com.example.chat.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private UsuarioRepository usuarioRepository;
    private AuthenticationManager authenticationManager;
    private TokenService tokenService;
    public AuthenticationController(
            UsuarioRepository usuarioRepository,
            AuthenticationManager authenticationManager,
            TokenService tokenService
    ){
        this.usuarioRepository = usuarioRepository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    @Transactional(readOnly = true) // estava no service
    public ResponseEntity<Object> login(@RequestBody UsuarioLoginDto dto) throws AuthenticationException {
        Authentication token = new UsernamePasswordAuthenticationToken(dto.nome(), dto.senha());
        Authentication auth = authenticationManager.authenticate(token);
        Usuario Usuario = (Usuario) auth.getPrincipal();
        return ResponseEntity.status(200)
                .body(new LoginResponseDto(tokenService.generateToken(Usuario.getNome())));
    }

    @PostMapping("/signin")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional // estava no service
    public ResponseEntity<Object> register(@RequestBody @Valid UsuarioPostDto dto) {
        Usuario usuario = Usuario.dtoToEntity(dto);
        usuario = usuarioRepository.save(usuario);
        return ResponseEntity.status(201).body(Usuario.entityToDto(usuario));
    }
}