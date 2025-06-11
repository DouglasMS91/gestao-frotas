import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = 'http://localhost:4200/agendamentos'; // Ajuste conforme seu backend

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

