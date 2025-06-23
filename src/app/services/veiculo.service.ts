import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Motorista } from '../models/motorista.model';

export interface Veiculo {
  id: number; 
  placa: string;
  modelo: string;
  tipo: string;
  ano: number;
  quilometragemAtual: number;
  status: 'Disponível' | 'Inativo' | 'Em Manutenção';
}

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private veiculos: Veiculo[] = [];
  private veiculosSubject = new BehaviorSubject<Veiculo[]>(this.veiculos);
  
  private apiUrl = 'http://localhost:8080/api/veiculos';
  constructor(private http: HttpClient) {}
  
  
  /*getVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }*/
  
  getVeiculoById(id: number): Veiculo | undefined {
    return this.veiculos.find(v => v.id === id);
  }
  
    getVeiculos(): Observable<Veiculo[]> {
    return this.veiculosSubject.asObservable();
  }
  
  adicionarVeiculo(novoVeiculo: Veiculo): void {
    this.veiculos.push(novoVeiculo);
    this.veiculosSubject.next([...this.veiculos]);
  }
  
  atualizarVeiculo(veiculoAtualizado: Veiculo): void {
    const index = this.veiculos.findIndex(v => v.id === veiculoAtualizado.id);
    if (index !== -1) {
      this.veiculos[index] = veiculoAtualizado;
      this.veiculosSubject.next([...this.veiculos]); 
    }
  }
  
  removerVeiculo(id: number): void {
    this.veiculos = this.veiculos.filter(v => v.id !== id);
    this.veiculosSubject.next([...this.veiculos]);
  }
}
