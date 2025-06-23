import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormMotoristasComponent } from './cadastrar-motorista/form-motoristas.component';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ExcluirMotoristaComponent } from './excluir-motorista/excluir-motorista';
import { Motorista } from '../../../models/motorista.model';
import { MotoristaService } from '../../../services/motorista.service';
import { EditarMotoristaComponent } from './editar-motorista/editar-motorista.component';



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
    MatIconModule
  ],
  templateUrl: './gerenciar-motoristas.component.html',
  styleUrl: './gerenciar-motoristas.component.css'
})

export class GerenciarMotoristasComponent {
  lista_motoristas: Motorista[] = [];
  
  visualizarSenha(motorista: Motorista){
    motorista.exibirSenha = !motorista.exibirSenha;
  }
  
  
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
  
  constructor(
    private dialog: MatDialog,
    private motoristaService: MotoristaService
  ) {}
  
  ngOnInit() {
    this.motoristaService.getMotoristas();
    this.motoristaService.getMotoristas().subscribe(motoristas => {
      this.lista_motoristas = [...motoristas];
    });
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(FormMotoristasComponent, {
      width: '40%',
    });
    
    dialogRef.afterClosed().subscribe((form: any) => {
      console.log('Dados do diálogo:', form);
      if (form) {
        const novoMotorista: Motorista = {
          nome: form.nome,
          cpf: form.cpf,
          cnh: form.cnh,
          validade_cnh: form.validade_cnh,
          telefone: form.telefone,
          cep: form.cep,
          logradouro: form.logradouro,
          bairro: form.bairro,
          localidade: form.string,
          uf: form.uf,
          email: form.email,
          senha: form.senha
        };
        this.motoristaService.cadastrarMotorista(novoMotorista).subscribe({
          next: (motoristaCriado) => {
            this.lista_motoristas.push(motoristaCriado);
          },
          error: (err) => {
            console.error("Erro ao cadastrar;", err);
          }
        })
      } 
    });
  }
  
  formatarEndereco(motorista: any): string {
    const partes = [];
    if (motorista.logradouro) partes.push(motorista.logradouro);
    if (motorista.bairro) partes.push(motorista.bairro);
    if (motorista.localidade && motorista.uf) {
      partes.push(`${motorista.localidade} - ${motorista.uf}`);
    }
    return partes.join(', ');
  }
  
  editMotorista(motorista: any): void {
    const dialogRef = this.dialog.open(EditarMotoristaComponent, {
      width: '40%',
      data: motorista,
    });
    
    dialogRef.afterClosed().subscribe((motoristaAtualizado) => {
      if (motoristaAtualizado) {
        this.motoristaService.atualizarMotorista(motoristaAtualizado);
      }
    });
  }
  
  
  
  deleteMotorista(motorista: Motorista): void {
    const dialogRef = this.dialog.open(ExcluirMotoristaComponent, {
      width: '30%',
    });
    
    dialogRef.afterClosed().subscribe((motoristaRemovido) => {
      if (motoristaRemovido) {
        this.motoristaService.removerMotorista(motorista.id!).subscribe({
          next: () => {
            this.lista_motoristas = this.lista_motoristas.filter(m => m.id !== motorista.id);
          }
        });
      }
    });
  }
}