import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { DialogComponent } from '../../../dialog/dialog.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ConfirmarExclusaoComponent } from './confirmar-exclusao-veiculo/confirmar-exclusao.component';
import { MatIconModule } from '@angular/material/icon';
import { Veiculo, VeiculoService } from '../../../services/veiculo.service';
import { EditarVeiculoComponent } from './components/editar-veiculo/editar-veiculo.component';


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


export class GerenciarVeiculosComponent implements OnInit {
  lista_veiculos: Veiculo[] = [];
  
  colunas: string[] = [
    'Placa',
    'Modelo',
    'Tipo',
    'Ano',
    'Quilometragem Atual',
    'Status',
    'Ações'
  ]

  constructor(
    private dialog: MatDialog,
    private veiculoService: VeiculoService
  ) {}

ngOnInit() {
    this.veiculoService.getVeiculos().subscribe(veiculos => {
      this.lista_veiculos = [...veiculos];
});
}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((form: any) => {
      if (form) {
        const novoVeiculo: Veiculo = {
          id: Date.now(), 
          placa: form.placa,
          modelo: form.modelo,
          tipo: form.tipo,
          ano: form.ano,
          quilometragemAtual: form.quilometragemAtual,
          status: 'Disponível' 
        };

        this.veiculoService.adicionarVeiculo(novoVeiculo);
      }
    });
  }

  

  editVeiculo(veiculo: any): void {
    const dialogRef = this.dialog.open(EditarVeiculoComponent, { 
      width: '30%',
      data: veiculo,
    });

    dialogRef.afterClosed().subscribe((veiculoAtualizado: Veiculo) => {
      if (veiculoAtualizado) {
        this.veiculoService.atualizarVeiculo(veiculoAtualizado);
      }
    });
  }

  deleteVeiculo(veiculo: Veiculo): void {
    const dialogRef = this.dialog.open(ConfirmarExclusaoComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        const index = this.lista_veiculos.indexOf(veiculo);
        if (resultado) {   
         this.veiculoService.removerVeiculo(veiculo.id);
        }
      }
    });
  }
}


