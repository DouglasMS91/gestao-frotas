import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Agendamento {
  id: number;
  data: string;
  veiculo: string;
  destino: string;
  status: 'AGENDADO' | 'EM USO' | 'FINALIZADO';
}

@Component({
  selector: 'app-motorista-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './motorista-home.component.html',
  styleUrls: ['./motorista-home.component.css']
})
export class MotoristaHomeComponent {
  agendamentos: Agendamento[] = [
    { id: 1, data: '2025-06-15 08:00', veiculo: 'Van A', destino: 'Curitiba', status: 'AGENDADO' },
    { id: 2, data: '2025-06-14 14:00', veiculo: 'Furgão B', destino: 'Londrina', status: 'EM USO' },
    { id: 3, data: '2025-06-10 09:00', veiculo: 'Carro C', destino: 'Cascavel', status: 'FINALIZADO' },
  ];

  iniciarViagem(id: number) {
    console.log('Iniciar viagem:', id);
  }

  finalizarViagem(id: number) {
    console.log('Finalizar viagem:', id);
  }

  visualizarDetalhes(id: number) {
    console.log('Visualizar detalhes da viagem:', id);
  }
}
