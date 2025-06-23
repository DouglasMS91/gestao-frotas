import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { Dialog } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ConfirmarExclusaoComponent } from './excluir-veiculo/confirmar-exclusao.component';
import { MatIconModule } from '@angular/material/icon';
import { Veiculo, VeiculoService } from '../../../services/veiculo.service';
import { EditarVeiculoComponent } from './components/editar-veiculo/editar-veiculo.component';
import { CadastrarVeiculoComponent } from './components/cadastrar-veiculo/cadastrar-veiculo.component';


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
    MatIconModule,
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
    const dialogRef = this.dialog.open(CadastrarVeiculoComponent, {
      width: '40%',
    });
    
    dialogRef.afterClosed().subscribe((form: any) => {
       if (form) {
        delete form.id;
        
        const novoVeiculo: Veiculo = {
          id: form.id,
          placa: form.placa,
          modelo: form.modelo,
          tipo: form.tipo,
          ano: form.ano,
          quilometragemAtual: form.quilometragemAtual,
          status: form.status,
        };
        this.veiculoService.adicionarVeiculo(novoVeiculo).subscribe({
          next: (novoVeiculo) => {
            this.lista_veiculos.push(novoVeiculo);
            this.lista_veiculos = [...this.lista_veiculos];
          },
          error: (err) => {
            console.error("Erro ao cadastrar;", err);
          }
        })
      }
    });
  }
  
  editVeiculo(veiculo: any): void {
    const dialogRef = this.dialog.open(EditarVeiculoComponent, { 
      width: '40%',
      data: veiculo,
    });
    
    dialogRef.afterClosed().subscribe((veiculoAtualizado) => {
      if (veiculoAtualizado) {
        this.veiculoService.atualizarVeiculo(veiculoAtualizado).subscribe({
          next: (veiculo) => {
            const index = this.lista_veiculos.findIndex(v => v.id === veiculo.id);
            if (index !== -1){
              this.lista_veiculos[index] = veiculo;
              this.lista_veiculos = [...this.lista_veiculos];
            }
          }
        })
      }
    });
  }
  
  deleteVeiculo(veiculo: Veiculo): void {
    const dialogRef = this.dialog.open(ConfirmarExclusaoComponent, {
      width: '30%',
    });
    
    dialogRef.afterClosed().subscribe((veiculoRemovido) => {
      if (veiculoRemovido) {
        this.veiculoService.removerVeiculo(veiculo.id!).subscribe({
          next: () => {
            this.lista_veiculos = this.lista_veiculos.filter(v => v.id !== veiculo.id);
          }
        })
      }
    });
  }
}


