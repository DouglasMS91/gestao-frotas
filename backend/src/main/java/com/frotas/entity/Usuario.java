package com.frotas.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.frotas.entity.enums.Perfil;

@Entity
@Data // <- Lombok gera getters/setters/toString/etc.
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String senha;

    @Enumerated(EnumType.STRING)
    private Perfil perfil;

    private boolean ativo;


    public boolean getAtivo() {
    return ativo;
    }
}   