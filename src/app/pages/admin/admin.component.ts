import { Component, OnInit} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AgendamentoService } from '../../services/agendamento.service';
import { Agendamento } from '../../models/agendamento.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent implements OnInit {
  //opened = true;
  agendamentos: Agendamento[] = [];

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
    this.agendamentos = [
    { id: 1, status: 'PENDENTE', motorista: { id: 1, nome: 'João' }, dataInicio: '10/05/2025', dataFim: '15/05/2025', veiculo: { modelo: '', placa: '' } },
    { id: 2, status: 'EM_USO', motorista: { id: 2, nome: 'Maria' }, dataInicio: '', dataFim: '', veiculo: { modelo: '', placa: '' } },
    { id: 3, status: 'FINALIZADO', motorista: { id: 3, nome: 'Carlos' }, dataInicio: '', dataFim: '', veiculo: { modelo: '', placa: '' } }
  ];
  }

    carregarAgendamentos(): void {
    this.agendamentoService.listarAgendamentos({}).subscribe({
      next: (res) => this.agendamentos = res,
      error: (err) => console.error(err)
    });
  }
  filtros = {
    periodoInicial: '',
    periodoFinal: '',
    status: '',
    motorista: ''
  };

  filtrar() {
    console.log(this.filtros);
    // Aqui você pode usar o AgendamentoService.listarAgendamentos(this.filtros)
  }

  // MÉTODOS QUE ESTÃO SENDO CHAMADOS NO HTML - DECLARADOS AQUI
  agendarViagem(id: number): void {
    console.log('Agendar viagem para o agendamento id:', id);
    // Lógica para agendar viagem
  }

  registrarAbastecimento(id: number): void {
    console.log('Registrar abastecimento para o agendamento id:', id);
    // Lógica para registrar abastecimento
  }

  registrarManutencao(id: number): void {
    console.log('Registrar manutenção para o agendamento id:', id);
    // Lógica para registrar manutenção
  }
}
