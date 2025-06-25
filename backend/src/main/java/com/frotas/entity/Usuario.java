package com.frotas.entity;

import jakarta.persistence.*;
import com.frotas.entity.enums.Perfil;

@Entity
public class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String senha;

    @Enumerated(EnumType.STRING)
    private Perfil perfil;

    private Boolean ativo;

    // Getters e setters
}