package com.frotas.controller;

import com.frotas.dto.LoginRequest;
import com.frotas.dto.LoginResponse;
import com.frotas.entity.Usuario;
import com.frotas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {
        Usuario usuario = usuarioService.login(req.email, req.senha);
        LoginResponse resp = new LoginResponse();
        resp.id = usuario.getId();
        resp.nome = usuario.getNome();
        resp.perfil = usuario.getPerfil().name();
        return ResponseEntity.ok(resp);
    }
}