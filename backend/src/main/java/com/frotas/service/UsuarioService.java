package com.frotas.service;

import com.frotas.entity.Usuario;
import com.frotas.repository.UsuarioRepository;
import com.frotas.util.HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario login(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        String senhaHash = HashUtil.sha256ComSalt(senha);
        if (!usuario.getSenha().equals(senhaHash)) {
            throw new RuntimeException("Senha inválida");
        }

        return usuario;
    }
}