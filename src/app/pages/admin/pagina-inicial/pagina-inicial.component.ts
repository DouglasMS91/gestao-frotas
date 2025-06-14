import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgendarViagemComponent } from '../agendar-viagem/agendar-viagem.component';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarAbastecimentoComponent } from '../registrar-abastecimento/registrar-abastecimento.component';
import { RegistrarManutencaoComponent } from '../registrar-manutencao/registrar-manutencao.component';




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
  veiculos: any = [
    'Fusca',
    'Caminhonete'
  ]

  motoristas: any = [
    'João da Silva',
    'Maria Oliveira'
  ]

  constructor(private dialog: MatDialog) { }
  agendarViagem(id: number) {
  this.dialog.open(AgendarViagemComponent, {
    width: '30%',
    data: {
      veiculos: this.veiculos, // array de veículos disponíveis
      motoristas: this.motoristas // array de motoristas disponíveis
    }
  }).afterClosed().subscribe(result => {
    if (result) {
      // Salve o agendamento (ex: this.agendamentos.push(result))
    }
  });
}

registrarAbastecimento(id: number) {
  this.dialog.open(RegistrarAbastecimentoComponent, {
    width: '30%',
    data: {
      veiculos: this.veiculos, // array de veículos disponíveis 
      motoristas: this.motoristas // array de motoristas disponíveis
    }
  }).afterClosed().subscribe(result => {
    if (result) {
      // Salve o abastecimento (ex: this.abastecimentos.push(result))      
    }
  });
}

  registrarManutencao(id: number) {
      this.dialog.open(RegistrarManutencaoComponent, {
        width: '30%',
        data: {
          veiculos: this.veiculos // array de veículos disponíveis
        }
    }).afterClosed().subscribe(result => {
    if (result) {
     
    }
  });
}



  agendamentos: any[] = [];

  ngOnInit(): void {
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

  
    
  
  
}

