import { Injectable, model } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private veiculos: Veiculo[] = [
    { id: 1, 
      placa: 'ABC-1234', 
      modelo: 'Fusca', 
      tipo: 'Carro', 
      ano: 1975, 
      quilometragemAtual: 120000, 
      status: 'Disponível' 
    },
    {id: 2, 
      placa: 'ABC-0000', 
      modelo: 'F-150', 
      tipo: 'Caminhão', 
      ano: 2012, 
      quilometragemAtual: 18231, 
      status: 'Disponível' 
    },
  ];
  
  private veiculosSubject = new BehaviorSubject<Veiculo[]>(this.veiculos);
  
  constructor() {}
  
  getVeiculos(): Observable<Veiculo[]> {
    return this.veiculosSubject.asObservable();
  }
  
  getVeiculoById(id: number): Veiculo | undefined {
    return this.veiculos.find(v => v.id === id);
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
