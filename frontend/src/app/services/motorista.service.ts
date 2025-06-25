import { Injectable } from "@angular/core";
import { Motorista } from "../models/motorista.model";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

/*
export interface Motorista {
id?: number;
nome: string;
cpf: string;
cnh: string;
validade_cnh: Date;
telefone: string;
cep: string;
logradouro: string;
bairro: string;
localidade: string;
uf: string;
email: string;
senha: string;
exibirSenha?: boolean;
}
*/

@Injectable({
    providedIn: "root",   
})

export class MotoristaService {
    private motoristas: Motorista[] = [];
    private motoristaSubject = new BehaviorSubject<Motorista[]>(this.motoristas);
    
    private apiUrl = 'http://localhost:8080/api/motoristas';
    constructor(private http: HttpClient) {}

     getMotoristas(): Observable<Motorista[]> {
        return this.http.get<Motorista[]>(this.apiUrl);
    }
    
    cadastrarMotorista(motorista: Motorista): Observable<Motorista> {
        return this.http.post<Motorista>(this.apiUrl, motorista,
            {headers: {'Content-Type': 'application/json'}}
        );
    }
    
    atualizarMotorista(motorista: Motorista): Observable<Motorista> {
       return this.http.put<Motorista>(`${this.apiUrl}/${motorista.id}`, motorista);
    }
    
    removerMotorista(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

   /* adicionarMotorista(novoMotorista: Motorista): void {
    this.motoristas.push(novoMotorista);
    this.motoristaSubject.next([...this.motoristas]);
    }*/
    
    /*
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
    bairro: "Mossunguê",
    localidade: "Curitiba",
    uf: "PR",
    email: "joao.s@gmail.com", 
    senha: "senha123",
    },
    ];   
    
    private motoristaSubject = new BehaviorSubject<Motorista[]>(this.motoristas);
    
    //constructor() {}
    
    getMotoristas(): Observable<Motorista[]> {
    return this.motoristaSubject.asObservable();
    }
    
    getMotoristaById(id: number): Motorista | undefined {
    return this.motoristas.find(m => m.id === id);
    }
    
    
    ** Quando o back estiver pronto
    getMotoristas() -> Você troca o método listarMotoristas() para fazer uma requisição real ao banco:
    listarMotoristas(): Observable<Motorista[]> {
    return this.http.get<Motorista[]>('http://localhost:8080/api/motoristas');
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
    */
    
    
    
    
    
}