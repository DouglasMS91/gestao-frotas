package com.frotas.service;

import com.frotas.entity.Usuario;
import com.frotas.repository.UsuarioRepository;
import com.frotas.util.HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Usuario> login(String email, String senha) {
        Optional<Usuario> optUsuario = usuarioRepository.findByEmail(email);

        if (optUsuario.isPresent()) {
            Usuario usuario = optUsuario.get();
            String senhaHash = HashUtil.sha256ComSalt(senha); // com SALT fixo

            if (usuario.getSenha().equals(senhaHash) && Boolean.TRUE.equals(usuario.getAtivo())) {
                return Optional.of(usuario);
            }
        }

        return Optional.empty();
    }
}