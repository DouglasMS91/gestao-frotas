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
    MatTableModule
  ],
  templateUrl: './gerenciar-veiculos.component.html',
  styleUrl: './gerenciar-veiculos.component.css'
})


export class GerenciarVeiculosComponent {
  lista_veiculos: any[] = [];

  colunas: string[] = [
    'Placa',
    'Modelo',
    'Tipo',
    'Ano',
    'Quilometragem Atual',
    'Status',
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
}
