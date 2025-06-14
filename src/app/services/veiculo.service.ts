import { Injectable, model } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

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

  constructor() {}

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
      this.veiculosSubject.next([...this.veiculos]); // dispara atualização
    }
  }

  removerVeiculo(id: number): void {
    this.veiculos = this.veiculos.filter(v => v.id !== id);
    this.veiculosSubject.next([...this.veiculos]);
  }
}
