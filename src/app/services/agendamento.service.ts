import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable, BehaviorSubject, forkJoin, ReplaySubject} from 'rxjs';
import { Agendamento } from '../models/agendamento.model';
import { Motorista } from '../models/motorista.model';
import { MotoristaService } from './motorista.service';
import { Veiculo, VeiculoService } from './veiculo.service';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private agendamentos: Agendamento [] = [];
  private agendamentoSubject = new BehaviorSubject<Agendamento[]>([]);
  
  
  constructor(private motoristaService: MotoristaService, private veiculoService: VeiculoService) {}
  
  
  criarAgendamento(agendamento: Agendamento): void {
    this.agendamentos.push(agendamento);
    this.agendamentoSubject.next(this.agendamentos);
    }
 
    
    
    getAgendamentos(): Observable<Agendamento[]> {
      return this.agendamentoSubject.asObservable();
    }
    
  }
  
  /*
  export class AgendamentoService {
  private agendamentos: Agendamento [] = [];
  private agendamentoSubject = new ReplaySubject<Agendamento[]>(1);
  
  constructor(
  private motoristaService: MotoristaService,
  private veiculoService: VeiculoService
  ) {}
  
  initMockData(): void {
  forkJoin({
  motoristas: this.motoristaService.getMotoristas(),
  veiculos: this.veiculoService.getVeiculos()
  }).subscribe(({ motoristas, veiculos }) => {
  console.log('Mock carregado:', motoristas, veiculos);
  this.agendamentos = [
  {
  id: 1,
  motorista: motoristas[0],
  veiculo: veiculos[0],
  data: new Date('15-06-2025'),
  status: 'PENDENTE'
  }
  ];
  console.log('Mock agendamento gerado:', this.agendamentos);
  this.agendamentoSubject.next(this.agendamentos);
  });
  }
  
  
  
  getAgendamentos(): Observable<Agendamento[]> {
  return this.agendamentoSubject.asObservable();
  }
  
  }*/
  
  
  
  /*
  constructor(private http: HttpClient) {}
  
  listarAgendamentos(filtros: any): Observable<Agendamento[]> {
  let params = new HttpParams();
  if (filtros.periodoInicial) {
  params = params.set('periodoInicial', filtros.periodoInicial);
  }
  if (filtros.periodoFinal) {
  params = params.set('periodoFinal', filtros.periodoFinal);
  }
  if (filtros.status) {
  params = params.set('status', filtros.status);
  }
  if (filtros.motorista) {
  params = params.set('motorista', filtros.motorista);
  }
  
  return this.http.get<Agendamento[]>(this.apiUrl, { params });
  }
  }
  -----------------------------------------------------------------------
  export class AgendamentoService {
  //private apiUrl = 'http://localhost:4200/agendamentos'; // Ajuste conforme seu backend
  
  private agendamentos: Agendamento [] = [];
  
  
  constructor(
  private motoristaService: MotoristaService,
  private veiculoService: VeiculoService,
  ) {
  const motoritsa = this.motoristaService.getMotoristas();
  const veiculo = this.veiculoService.getVeiculos();
  }
  
  
  
  agendarViagem(agendamentos: Agendamento): Observable<Agendamento> {
  agendamentos.id = this.agendamentos.length + 1;
  this.agendamentos.push(agendamentos);
  return of(agendamentos);
  }
  
  listarViagens(): Observable<Agendamento[]> {
  return of(this.agendamentos);
  }
  }
  
  
  */
  
  
  
  
  