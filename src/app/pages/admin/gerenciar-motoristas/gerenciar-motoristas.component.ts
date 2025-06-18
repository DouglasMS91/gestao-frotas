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
    this.motoristaService.getMotoristas().subscribe(motoristas => {
      this.lista_motoristas = [...motoristas];
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormMotoristasComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((form: any) => {
      if (form) {
        const novoMotorista: Motorista = {
          id: Date.now(),
          nome: form.nome,
          cpf: form.cpf,
          cnh: form.cnh,
          validade_cnh: form.validade_cnh,
          telefone: form.telefone,
          cep: form.cep,
          logradouro: form.logradouro,
          bairo: form.bairo,
          localidade: form.string,
          uf: form.uf,
          email: form.email,
          senha: form.senha
      };
        this.motoristaService.adicionarMotorista(novoMotorista);
      } 
    });
  }

  formatarEndereco(motorista: any): string {
    const partes = [];
    if (motorista.logradouro) partes.push(motorista.logradouro);
    if (motorista.bairro) partes.push(`Bairro: ${motorista.bairro}`);
    if (motorista.localidade && motorista.uf) {
      partes.push(`${motorista.localidade} - ${motorista.uf}`);
  }
  return partes.join(', ');
  }
  
  editMotorista(motorista: any): void {
  const dialogRef = this.dialog.open(EditarMotoristaComponent, {
    width: '30%',
    data: motorista,
  });

  dialogRef.afterClosed().subscribe((motoristaAtualizado) => {
    if (motoristaAtualizado) {
      this.motoristaService.atualizarMotorista(motoristaAtualizado);
    }
  });
}


deleteMotorista(motorista: any): void {
  const dialogRef = this.dialog.open(ExcluirMotoristaComponent, {
    width: '30%',
  });

  dialogRef.afterClosed().subscribe((resultado) => {
    if (resultado) {
      const index = this.lista_motoristas.indexOf(motorista);
     if(resultado){
      this.motoristaService.removerMotorista(motorista.id);
       }
      }
    });
  }
}
