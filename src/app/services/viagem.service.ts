import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Viagem } from '../models/viagem.model';

@Injectable({
  providedIn: 'root'
})

export class ViagemService {

  private apiUrl = 'http://localhost:8080/api/viagens'; 

  constructor(private http: HttpClient) {}

  agendarViagem(viagem: Viagem): Observable<Viagem> {
    return this.http.post<Viagem>(this.apiUrl, viagem);
  }

  listarViagens(): Observable<Viagem[]> {
    return this.http.get<Viagem[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Viagem> {
    return this.http.get<Viagem>(`${this.apiUrl}/${id}`);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}