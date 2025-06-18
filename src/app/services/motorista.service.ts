import { Injectable } from "@angular/core";
import { Motorista } from "../models/motorista.model";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",   
})

export class MotoristaService {
    private motoristas: Motorista[] = [
        {
        id: 1, 
        nome: "João Silva", 
        cpf: "12345678901", 
        cnh: "1234567890", 
        validade_cnh: new Date("2025-12-31"), 
        telefone: "11987654321", 
        cep: "80740060",
        logradouro: "R. Dep. Heitor Alencar Furtado",
        bairo: "Mossunguê",
        localidade: "Curitiba",
        uf: "PR",
        email: 'joao.s@gmail.com', 
        senha: 'senha123'
    },
    ];   

    private motoristaSubject = new BehaviorSubject<Motorista[]>(this.motoristas);

    constructor() {}

    getMotoristas(): Observable<Motorista[]> {
        return this.motoristaSubject.asObservable();
    }
     
    adicionarMotorista(novoMotorista: Motorista): void {
        this.motoristas.push(novoMotorista);
        this.motoristaSubject.next([...this.motoristas]);
    }

    atualizarMotorista(motoristaAtualizado: Motorista): void {
        const index = this.motoristas.findIndex(m => m.id === motoristaAtualizado.id);
        if (index !== -1) {
            this.motoristas[index] = motoristaAtualizado;
            this.motoristaSubject.next([...this.motoristas]);
        }
    }

    removerMotorista(id: number): void {
        this.motoristas = this.motoristas.filter(m => m.id !== id);
        this.motoristaSubject.next([...this.motoristas]);
    }






}