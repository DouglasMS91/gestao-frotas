package com.frotas.controller;

import com.frotas.dto.LoginRequest;
import com.frotas.dto.LoginResponse;
import com.frotas.entity.Usuario;
import com.frotas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // permite acesso do Angular
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioService.login(request.getEmail(), request.getSenha());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            return ResponseEntity.ok(new LoginResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getPerfil().name()
            ));
        }

        return ResponseEntity.status(401).body("Credenciais inválidas ou usuário inativo.");
    }
}