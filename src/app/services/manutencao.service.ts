import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manutencao } from '../models/manutencao.model';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
  private apiUrl = 'http://localhost:8080/api/manutencoes';

  constructor(private http: HttpClient) {}

  registrarManutencao(manutencao: Manutencao): Observable<Manutencao> {
    return this.http.post<Manutencao>(this.apiUrl, manutencao);
  }

  listarManutencoes(): Observable<Manutencao[]> {
    return this.http.get<Manutencao[]>(this.apiUrl);
  }
}
