import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { DialogComponent } from '../../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ConfirmarExclusaoComponent } from './confirmar-exclusao-veiculo/confirmar-exclusao.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-gerenciar-veiculos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbar,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './gerenciar-veiculos.component.html',
  styleUrl: './gerenciar-veiculos.component.css'
})


export class GerenciarVeiculosComponent {
  lista_veiculos: any[] = [
    {
      placa: 'ABC-1234',
      modelo: 'Fusca',
      tipo: 'Carro',
      ano: 1975,
      quilometragemAtual: 150000,
      status: 'Disponível'
    },
    {
      placa: 'XYZ-5678',
      modelo: 'Caminhonete',
      tipo: 'Caminhonete',
      ano: 2010,
      quilometragemAtual: 80000,
      status: 'Em manutenção'
    },
    {
      placa: 'LMN-9012',
      modelo: 'Van',
      tipo: 'Van',
      ano: 2015,
      quilometragemAtual: 50000,
      status: 'Disponível'
    }
  ];

  colunas: string[] = [
    'Placa',
    'Modelo',
    'Tipo',
    'Ano',
    'Quilometragem Atual',
    'Status',
    'Ações'
  ]

  constructor(private dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
    })

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.lista_veiculos = [...this.lista_veiculos, resultado];
      }
    });
  }

  editVeiculo(veiculo: any): void {
    const dialogRef = this.dialog.open(DialogComponent, { 
      width: '30%',
      data: { veiculo }
    });
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const index = this.lista_veiculos.indexOf(veiculo);
        if (index > -1) {
          this.lista_veiculos[index] = resultado; // Atualiza o veiculo editado
          this.lista_veiculos = [...this.lista_veiculos]; // Atualiza a lista para refletir as mudanças
          console.log('Veiculo updated:', resultado);
        }
      }
    });
  }

  deleteVeiculo(veiculo: any): void {
    const dialogRef = this.dialog.open(ConfirmarExclusaoComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const index = this.lista_veiculos.indexOf(veiculo);
        if (index > -1) {   
          this.lista_veiculos.splice(index, 1);
          this.lista_veiculos = [...this.lista_veiculos]; // Atualiza a lista para refletir as mudanças
          console.log('Veiculo deleted:', veiculo);
        }
      }
    });
  }
}
