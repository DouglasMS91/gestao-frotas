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

export class PaginaInicialComponent  implements OnInit {
  veiculos: Veiculo[] = [];
  motoristas: Motorista[] = [];
  agendamentos: Agendamento[] = [];
  manutencoes: Manutencao[] = [];
  abastecimentos: Abastecimento[] = [];
  viagens: Viagem[] = [];
  
  constructor(
    private dialog: MatDialog,
    private veiculoService: VeiculoService,
    private motoristaService: MotoristaService,
    private agendamentoService: AgendamentoService,
    private manutencaoService: ManutencaoService,
    private abastecimentoService: AbastecimentoService,
    private viagemService: ViagemService
  ) {}
  
  
  
  ngOnInit() {
    this.motoristaService.getMotoristas().subscribe({
      next: (data) => {
        this.motoristas = data;
      },
      error: (err) => console.log('Erro ao carregar Motoristas', err)
    });
    
    this.veiculoService.getVeiculos().subscribe({
      next: (data) => {
        this.veiculos= data;
      },
      error: (err) => console.log('Erro ao carregar Veiculos', err)
    })
    
    this.agendamentoService.getAgendamentos().subscribe({
      next: (data) => {
        this.agendamentos = data;
      },
      error: (err) => console.log('Erro ao carregar Agendamentos', err)
    });
    
    
    /*this.veiculoService.getVeiculos().subscribe(v => {
    this.veiculos = v;
    });
    */
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
      }
    });
  }
  
  agendarViagem(agendamentoId: number) {
      this.dialog.open(AgendarViagemComponent, {
        width: '30%',
        data: {
          veiculos: this.veiculos,
          motoristas: this.motoristas,
          agendamentoId: agendamentoId
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
      
      registrarAbastecimento(id: number) {
        this.dialog.open(RegistrarAbastecimentoComponent, {
          width: '30%',
          data: {
            veiculos: this.veiculos,
            motoristas: this.motoristas 
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
      
      registrarManutencao(id: number) {
        this.dialog.open(RegistrarManutencaoComponent, {
          width: '30%',
          data: {
            veiculos: this.veiculos
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
          },
          error: err => {
            console.error('Erro ao excluir agendamento:', err);
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