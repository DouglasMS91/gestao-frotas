import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgendarViagemComponent } from '../agendar-viagem/agendar-viagem.component';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarAbastecimentoComponent } from '../registrar-abastecimento/registrar-abastecimento.component';
import { RegistrarManutencaoComponent } from '../registrar-manutencao/registrar-manutencao.component';
import { VeiculoService } from '../../../services/veiculo.service';
import { Veiculo } from '../../../models/veiculo.model';
import { Agendamento } from '../../../models/agendamento.model';
import { Motorista } from '../../../models/motorista.model';
import { MotoristaService } from '../../../services/motorista.service';




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
  veiculos: Veiculo[] = [];
  motoristas: Motorista[] = [];
  
  constructor(
    private dialog: MatDialog,
    private veiculoService: VeiculoService,
    private motoristaService: MotoristaService
  ) {}
  
  agendamentos: any[] = [];
  
  ngOnInit(): void {
    this.agendamentos = [
      { id: 1, status: 'PENDENTE', motorista: 'João', dataInicio: '10/05/2025', dataFim: '15/05/2025' },
      { id: 2, status: 'EM_USO', motorista: 'Maria', dataInicio: '1', dataFim: '1' },
      { id: 3, status: 'FINALIZADO', motorista: 'Carlos', dataInicio: '2', dataFim: '2' },
      { id: 4, status: 'EM_USO', motorista: 'Roney', dataInicio: '15/06/2025', dataFim: '20/06/2025' },
      { id: 5, status: 'PENDENTE', motorista: 'Roney', dataInicio: '15/06/2025', dataFim: '20/06/2025' },
      { id: 6, status: 'FINALIZADO', motorista: 'Roney', dataInicio: '15/06/2025', dataFim: '20/06/2025' },
      { id: 7, status: 'PENDENTE', motorista: 'Roney', dataInicio: '15/06/2025', dataFim: '20/06/2025' },
      { id: 8, status: 'EM_USO', motorista: 'Roney', dataInicio: '15/06/2025', dataFim: '20/06/2025' },
      { id: 9, status: 'FINALIZADO', motorista: 'Roney', dataInicio: '15/06/2025', dataFim: '20/06/2025' },
      
    ];

    this.veiculoService.getVeiculos().subscribe(v => {
    this.veiculos = v;
  });

   this.motoristaService.getMotoristas().subscribe(m => {
    this.motoristas = m;
   });
}   

  
  filtros = {
    periodoInicial: '',
    periodoFinal: '',
    status: '',
    motorista: ''
  };
  
  agendarViagem(id: number) {
    this.dialog.open(AgendarViagemComponent, {
      width: '30%',
      data: {
        veiculos: this.veiculos,
        motoristas: this.motoristas 
      }
    }).afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
  
  registrarAbastecimento(id: number) {
    this.dialog.open(RegistrarAbastecimentoComponent, {
      width: '30%',
      data: {
        veiculos: this.veiculos,
        motoristas: this.motoristas 
      }
    }).afterClosed().subscribe(result => {
      if (result) {     
      }
    });
  }
  
  registrarManutencao(id: number) {
    this.dialog.open(RegistrarManutencaoComponent, {
      width: '30%',
      data: {
        veiculos: this.veiculos
      }
    }).afterClosed().subscribe(result => {
      if (result) {
         // Salve o abastecimento (ex: this.abastecimentos.push(result)) 
      }
    });
  } 
  
  
}





/*
import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgendarViagemComponent } from '../agendar-viagem/agendar-viagem.component';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarAbastecimentoComponent } from '../registrar-abastecimento/registrar-abastecimento.component';
import { RegistrarManutencaoComponent } from '../registrar-manutencao/registrar-manutencao.component';
import { VeiculoService } from '../../../services/veiculo.service';
import { Veiculo } from '../../../models/veiculo.model';




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
veiculo: Veiculo[] = [];

constructor(
private dialog: MatDialog,
private veiculoService: VeiculoService,
) {}

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

agendarViagem(id: number) {
this.dialog.open(AgendarViagemComponent, {
width: '30%',
}).afterClosed().subscribe(result => {
if (result) {
// Salve o agendamento (ex: this.agendamentos.push(result))
}
});
}

registrarAbastecimento(id: number) {
this.dialog.open(RegistrarAbastecimentoComponent, {
width: '30%',
}).afterClosed().subscribe(result => {
if (result) {
// Salve o abastecimento (ex: this.abastecimentos.push(result))      
}
});
}

registrarManutencao(id: number) {
this.dialog.open(RegistrarManutencaoComponent, {
width: '30%',
}).afterClosed().subscribe(result => {
if (result) {

}
});
} 


}

*/