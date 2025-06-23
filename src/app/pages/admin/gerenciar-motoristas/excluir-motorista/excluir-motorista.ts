import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MotoristaService } from '../../../../services/motorista.service';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmar-exclusao',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './excluir-motorista.html',
  styleUrl: './excluir-motorista.css'
})
export class ExcluirMotoristaComponent {

  private apiUrl = 'http://localhost:8080/api/motoristas';
  constructor(private http: HttpClient) {}
  
  excluirMotorista(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

  

}
