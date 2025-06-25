import { Component, OnInit} from '@angular/core';
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
import { VeiculoService } from '../../../services/veiculo.service';
import { Veiculo } from '../../../models/veiculo.model';
import { Agendamento } from '../../../models/agendamento.model';
import { Motorista } from '../../../models/motorista.model';
import { MotoristaService } from '../../../services/motorista.service';
import { AgendamentoComponent } from '../agendamento/agendamento.component';
import { AgendamentoService } from '../../../services/agendamento.service';
import { subscribe } from 'diagnostics_channel';
import { ManutencaoService } from '../../../services/manutencao.service';
import { Manutencao } from '../../../models/manutencao.model';
import { AbastecimentoService } from '../../../services/abastecimento.service';
import { Abastecimento } from '../../../models/abastaceimento.model';
import { ViagemService } from '../../../services/viagem.service';
import { Viagem } from '../../../models/viagem.model';
import { MatTableModule } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
  ],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})

export class PaginaInicialComponent  implements OnInit {
  veiculos: Veiculo[] = [];
  motoristas: Motorista[] = [];
  agendamentos: Agendamento[] = [];
  manutencoes: Manutencao[] = [];
  abastecimentos: Abastecimento[] = [];
  viagens: Viagem[] = [];
  displayedColumns: string[] = ['id', 'status', 'motorista', 'veiculo', 'data', 'ações', 'excluirAgendamento'];
  filtro = { motoristaId: '', status: '', dataInicio: null as Date | null, dataFim: null as Date| null};
  todosAgendamentos: any[] = []; 
  lista: any[] = [];
  
  
  constructor(
    private dialog: MatDialog,
    private veiculoService: VeiculoService,
    private motoristaService: MotoristaService,
    private agendamentoService: AgendamentoService,
    private manutencaoService: ManutencaoService,
    private abastecimentoService: AbastecimentoService,
    private viagemService: ViagemService,
  ) {}
  
  ngOnInit() {
    
    
    forkJoin({
      motoristas: this.motoristaService.getMotoristas(),
      veiculos: this.veiculoService.getVeiculos(),
      agendamentos: this.agendamentoService.getAgendamentos()
    }).subscribe({
      next: ({ motoristas, veiculos, agendamentos }) => {
        this.motoristas = motoristas;
        this.veiculos = veiculos;
        this.agendamentos = agendamentos;
        this.todosAgendamentos = agendamentos;
        this.aplicarFiltro();
      },
      error: (err) => console.log('Erro ao carregar dados:', err)
    });
    console.log('Agendamentos recebidos:', this.todosAgendamentos);
  }
  
  openDialog(): void{
    const dialogRef = this.dialog.open(AgendamentoComponent, {
      width: '30%',
      data: {
        veiculos: this.veiculos,
        motoristas: this.motoristas,
      }
    });
    dialogRef.afterClosed().subscribe((novoAgendamento) => {
      if (novoAgendamento) {
        this.agendamentos.push(novoAgendamento);
        this.agendamentos = [...this.agendamentos];
        this.aplicarFiltro();
      }
    });
  }
  
  agendarViagem(agendamentoId: number) {
    const agendamento = this.agendamentos.find(a => a.id === agendamentoId);
    
    
    this.dialog.open(AgendarViagemComponent, {
      width: '30%',
      data: {
        agendamentoId: agendamento?.id,
        motorista: agendamento?.motorista.id,
        veiculo: agendamento?.veiculo.id
      }
    }).afterClosed().subscribe(viagem => {
      if (viagem) {
        this.viagens.push(viagem);
        this.viagens = [...this.viagens];
        
        const agendamento = this.agendamentos.find(a => a.id === viagem.agendamentoId);
        if (agendamento) {
          agendamento.status = 'AGENDADO';
        }
      }
    });
  }
  
  registrarAbastecimento(agendamentoId: number) {
    const agendamento = this.agendamentos.find(a => a.id === agendamentoId);
    
    this.dialog.open(RegistrarAbastecimentoComponent, {
      width: '30%',
      data: {
        agendamentoId: agendamento?.id,
        motorista: agendamento?.motorista.id,
        veiculo: agendamento?.veiculo.id 
      }
    }).afterClosed().subscribe(result => {
      if (result) {     
        this.abastecimentoService.registrarAbastecimento(result).subscribe({
          next: (novoAbastecimento) => {
            this.abastecimentos.push(novoAbastecimento);
            this.abastecimentos = [...this.abastecimentos];
          },
          error: err => console.error('Erro ao salvar abastecimento:', err)
        })
      }
    });
  }
  
  registrarManutencao(agendamentoId: number) {
    const agendamento = this.agendamentos.find(a => a.id === agendamentoId);
    
    this.dialog.open(RegistrarManutencaoComponent, {
      width: '30%',
      data: {
        agendamentoId: agendamento?.id,
        motorista: agendamento?.motorista.id,
        veiculo: agendamento?.veiculo.id
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.manutencaoService.registrarManutencao(result).subscribe({
          next: (novaManutencao) => {
            this.manutencoes.push(novaManutencao); 
            this.manutencoes = [...this.manutencoes];
          },
          error: err => console.error('Erro ao salvar manutenção:', err)
        });
      }
    });
  } 
  
  excluirAgendamento(id: number): void {
    this.agendamentoService.excluirAgendamento(id).subscribe({
      next: () => {
        this.agendamentos = this.agendamentos.filter(ag => ag.id !== id);
        this.lista = this.lista.filter(ag => ag.id !== id);
      },
      error: err => {
        console.error('Erro ao excluir agendamento:', err);
      }
    });
  }
  
  aplicarFiltro() {
    this.lista = this.todosAgendamentos.filter(ag => {
      const porMotorista = !this.filtro.motoristaId || ag.motorista.id === +this.filtro.motoristaId;
      const porStatus = !this.filtro.status || ag.status === this.filtro.status;
      const porData = this.filtrarPorIntervaloDeData(ag.data);
      //const porData = !this.filtro.data || this.compararDatas(ag.data, this.filtro.data);
      return porMotorista && porStatus && porData;
    });
  }
  
  compararDatas(data1: string, data2: Date): boolean {
    if (!data1) return false;
    const [dia, mes, ano] = data1.split('/').map(Number);
    const d1 = new Date(ano, mes - 1, dia);
    return d1.toDateString() === data2.toDateString();
  }
  
  limparFiltros() {
    this.filtro = {
      motoristaId: '',
      status: '',
      dataInicio: null,
      dataFim: null
    };
    this.aplicarFiltro();
  }
  
  filtrarPorIntervaloDeData(dataAgendamento: string): boolean {
  if (!dataAgendamento) return false;

  const data = new Date(dataAgendamento); // formato ISO

  if (isNaN(data.getTime())) return false; // Data inválida

  const inicio = this.filtro.dataInicio ? new Date(this.filtro.dataInicio) : null;
  const fim = this.filtro.dataFim ? new Date(this.filtro.dataFim) : null;

  // Normalizar horários
  if (inicio) inicio.setHours(0, 0, 0, 0);
  if (fim) fim.setHours(23, 59, 59, 999);
  data.setHours(12, 0, 0, 0);

  if (inicio && data < inicio) return false;
  if (fim && data > fim) return false;

  return true;
}

}





