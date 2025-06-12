import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})

export class PaginaInicialComponent  implements OnInit{
  agendamentos: any[] = [];

  ngOnInit(): void {
    console.log('Página Inicial carregada');
    this.agendamentos = [
      { id: 1, status: 'PENDENTE', motorista: 'João', dataInicio: '10/05/2025', dataFim: '15/05/2025' },
      { id: 2, status: 'EM_USO', motorista: 'Maria', dataInicio: '1', dataFim: '1' },
      { id: 3, status: 'FINALIZADO', motorista: 'Carlos', dataInicio: '2', dataFim: '2' },
      { id: 4, status: 'PENDENTE', motorista: 'Roney', dataInicio: '15/06/2025', dataFim: '20/06/2025' }
    ];
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

