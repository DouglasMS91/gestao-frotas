import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Abastecimento } from '../models/abastaceimento.model';

@Injectable({
  providedIn: 'root'
})

export class AbastecimentoService {
    private abastecimentos: Abastecimento [] = [];
    private apiUrl = 'http://localhost:8080/api/abastecimentos';

    constructor(private http: HttpClient) {}

    registrarAbastecimento(abastecimento: Abastecimento): Observable<Abastecimento> {
      return this.http.post<Abastecimento>(this.apiUrl, abastecimento);
    }




}
