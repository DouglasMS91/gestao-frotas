import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { IniciarViagemDialogComponent } from './iniciar-viagem-dialog/iniciar-viagem-dialog.component';
import { DetalhesViagemDialogComponent } from './detalhes-viagem-dialog/detalhes-viagem-dialog.component';
import { FinalizarViagemDialogComponent } from './finalizar-viagem-dialog/finalizar-viagem-dialog.component';


interface Agendamento {
  id: number;
  data: string;
  veiculo: string;
  destino: string;
  status: 'AGENDADO' | 'EM USO' | 'FINALIZADO';
  motorista?: string;
  justificativa?: string;
  observacoes?: string;
  quilometragemInicial?: number;
  quilometragemFinal?: number;
  dataRetorno?: string;
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
  {
    id: 1,
    data: '2025-06-15 08:00',
    veiculo: 'Van A',
    destino: 'Curitiba',
    status: 'AGENDADO',
    motorista: 'João da Silva',
    justificativa: 'Entrega de documentos',
    observacoes: '',
    quilometragemInicial: 10250,
    quilometragemFinal: undefined,
    dataRetorno: undefined
  },
  {
    id: 2,
    data: '2025-06-14 14:00',
    veiculo: 'Furgão B',
    destino: 'Londrina',
    status: 'EM USO',
    motorista: 'João da Silva',
    justificativa: 'Serviço interno',
    observacoes: 'Motor ruidoso',
    quilometragemInicial: 89350,
    quilometragemFinal: undefined,
    dataRetorno: undefined
  },
  {
    id: 3,
    data: '2025-06-10 09:00',
    veiculo: 'Carro C',
    destino: 'Cascavel',
    status: 'FINALIZADO',
    motorista: 'João da Silva',
    justificativa: 'Inspeção técnica',
    observacoes: 'Tudo normal',
    quilometragemInicial: 120000,
    quilometragemFinal: 120320,
    dataRetorno: '2025-06-10 18:00'
  }
];

  iniciarViagem(id: number) {
  const dialogRef = this.dialog.open(IniciarViagemDialogComponent, {
    width: '400px',
    data: { agendamentoId: id }
  });

  dialogRef.afterClosed().subscribe(result => {
    const agendamento = this.agendamentos.find(a => a.id === id);
      if (agendamento) {
        agendamento.quilometragemInicial = result.quilometragemAtual;
        agendamento.observacoes = result.observacoes;
        agendamento.status = 'EM USO';
        agendamento.dataRetorno = undefined; // zera se estava preenchido por teste
      }
  });
}

  finalizarViagem(id: number) {
  const dialogRef = this.dialog.open(FinalizarViagemDialogComponent, {
    width: '400px',
    data: { agendamentoId: id }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const agendamento = this.agendamentos.find(a => a.id === id);
      if (agendamento) {
        agendamento.quilometragemFinal = result.quilometragemFinal;
        agendamento.observacoes = result.observacoes;
        agendamento.status = 'FINALIZADO';
        agendamento.dataRetorno = new Date().toISOString().slice(0, 16).replace('T', ' ');
      }
    }
  });
}

  visualizarDetalhes(id: number) {
  const agendamento = this.agendamentos.find(a => a.id === id);
  if (agendamento) {
    this.dialog.open(DetalhesViagemDialogComponent, {
      width: '450px',
      data: {
        ...agendamento,
        motorista: 'João da Silva', // pode ser dinâmico no futuro
        justificativa: agendamento.justificativa || 'Justificativa não informada',
        dataSaida: agendamento.data,
        dataRetorno: agendamento.dataRetorno || 'Ainda não retornou'
      }
    });
  }
}

  constructor(private dialog: MatDialog) {

  }

}
