import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable, BehaviorSubject, forkJoin, ReplaySubject} from 'rxjs';
import { Agendamento } from '../models/agendamento.model';
import { Motorista } from '../models/motorista.model';
import { MotoristaService } from './motorista.service';
import { Veiculo, VeiculoService } from './veiculo.service';
import { AgendamentoCreateDTO } from '../models/agendamentoDTO';

@Injectable({
  providedIn: 'root'
})


export class AgendamentoService {
  private agendamentos: Agendamento[] = [];
  private agendamentoSubject = new BehaviorSubject<Agendamento[]>([]);

  private apiUrl = 'http://localhost:8080/api/agendamentos';

  constructor(
    private motoristaService: MotoristaService,
    private veiculoService: VeiculoService,
    private http: HttpClient
  ) {}

  getMotoristas(): Observable<Motorista[]> {
    return this.http.get<Motorista[]>(`${this.apiUrl}/motoristas`);
  }

  getVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/veiculos`);
  }

  criarAgendamento(dto: AgendamentoCreateDTO): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.apiUrl, dto);
  }


   getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl);
  }

  excluirAgendamento(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
 
  
}
 
  
  