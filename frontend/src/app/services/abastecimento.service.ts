import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Abastecimento } from '../models/abastaceimento.model';

@Injectable({
  providedIn: 'root'
})

export class AbastecimentoService {
    private abastecimentos: Abastecimento [] = [];
    //private apiUrl = 'http://localhost:4200/abastecimentos'; // Ajuste conforme seu backend

    constructor() {}

    registrarAbastecimento(abastecimentos: Abastecimento): Observable<Abastecimento> {
        abastecimentos.id = this.abastecimentos.length + 1;
        this.abastecimentos.push(abastecimentos);
        return of (abastecimentos);
    }




}
