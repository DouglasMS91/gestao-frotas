import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento.model';
import { Motorista } from '../models/motorista.model';
import { MotoristaService } from './motorista.service';
import { VeiculoService } from './veiculo.service';

@Injectable({
  providedIn: 'root'
})
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



  */




