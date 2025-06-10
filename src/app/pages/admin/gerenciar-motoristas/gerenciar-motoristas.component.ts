import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormMotoristasComponent } from './form-motoristas/form-motoristas.component';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmarExclusaoComponent } from './confirmar-exclusao/confirmar-exclusao.component';




@Component({
  selector: 'app-gerenciar-motoristas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule, 
    MatTableModule,
    MatSelectModule,
  ],
  templateUrl: './gerenciar-motoristas.component.html',
  styleUrl: './gerenciar-motoristas.component.css'
})

export class GerenciarMotoristasComponent {
  lista_motoristas: any[] = [];
  colunas: string[] = [
    'Nome',
    'CPF',
    'CNH',
    'Validade CNH',
    'Telefone',
    'Endereço',
    'Email',
    'Senha',
    'Ações'
  ]

  constructor(private dialog: MatDialog){}
  openDialog(): void {
    const dialogRef = this.dialog.open(FormMotoristasComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.lista_motoristas = [...this.lista_motoristas, resultado];
      }
    })
  }

  editMotorista(motorista: any): void {
  const dialogRef = this.dialog.open(FormMotoristasComponent, {
    width: '30%',
    data: {motorista}
  });
  dialogRef.afterClosed().subscribe((resultado) => {
    if (resultado) {
      const index = this.lista_motoristas.indexOf(motorista);
      if (index > -1) {
        this.lista_motoristas[index] = resultado; 
        this.lista_motoristas = [...this.lista_motoristas]; // Atualiza a lista para refletir as mudanças
        console.log('Motorista updated:', resultado);
      }
    }
  });
}


deleteMotorista(motorista: any): void {
  const dialogRef = this.dialog.open(ConfirmarExclusaoComponent, {
    width: '30%',
  });

  dialogRef.afterClosed().subscribe((confirmado) => {
    if (confirmado) {
      const index = this.lista_motoristas.indexOf(motorista);
      if (index > -1) { 
        this.lista_motoristas.splice(index, 1);
        this.lista_motoristas = [...this.lista_motoristas];
        console.log('Motorista deleted:', motorista);
      }
    }
  });
}

}
