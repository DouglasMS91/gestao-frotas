import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {
  colunas: string[] = ['veiculo', 'saida', 'retorno', 'destino', 'km'];
  viagens = [
    {
      veiculo: 'Van C',
      dataSaida: '01/06/2025 08:00',
      dataRetorno: '01/06/2025 18:00',
      destino: 'Ponta Grossa',
      kmInicial: 12000,
      kmFinal: 12250
    },
    {
      veiculo: 'Furgão A',
      dataSaida: '28/05/2025 09:30',
      dataRetorno: '28/05/2025 17:15',
      destino: 'Paranaguá',
      kmInicial: 9500,
      kmFinal: 9700
    }
  ];
}
