import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MotoristaService } from '../../../../services/motorista.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { provideNgxMask } from 'ngx-mask';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ViaCepService } from '../../../../services/viacep.service';

@Component({
  standalone: true,
  selector: 'app-editar-motorista',
  templateUrl: './editar-motorista.component.html',
  styleUrl: './editar-motorista.component.css',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule,
    MatIcon,
    MatDatepickerModule,
    MatNativeDateModule,
    //NgxMaskDirective,
  ],
  providers: [MotoristaService, provideNgxMask()]
})

export class EditarMotoristaComponent {
  motoristaForm: FormGroup;
  
  hide: boolean = true;
  visualizarSenha(): void {
    this.hide = !this.hide;
  }
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarMotoristaComponent>,
    private motoristaService: MotoristaService,
    private viaCep: ViaCepService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const motorista = this.data;
    this.motoristaForm = this.fb.group({
      id: [motorista.id],
      nome: [motorista.nome, Validators.required],
      cpf: [motorista.cpf, Validators.required],
      cnh: [motorista.cnh, Validators.required],
      validade_cnh: [motorista.validade_cnh, Validators.required],
      telefone: [motorista.telefone, Validators.required],
      cep: [motorista.cep, [Validators.required, Validators.pattern(/^\d{8}$/)]],
      logradouro: [motorista.logradouro],
      bairro: [motorista.bairro],
      localidade: [motorista.localidade],
      uf: [motorista.uf],
      email: [motorista.email, Validators.required],
      senha: [motorista.senha, Validators.required]
    });
    console.log('Motorista recebido:', motorista);
    
  }
  
  
  onSubmit(): void {
    if (this.motoristaForm.valid) {
      const motoristaAtualizado = this.motoristaForm.value;
      this.motoristaService.atualizarMotorista(motoristaAtualizado); // Atualiza a lista no serviço
      this.dialogRef.close(motoristaAtualizado);
      console.log('Motorista atualizado:', motoristaAtualizado);
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
  buscarCep(): void {
    const cep = this.motoristaForm.get('cep')?.value;
    if (cep && /^\d{8}$/.test(cep)) {
      this.viaCep.buscar(cep).subscribe(
        dados => {
          if (!dados.erro) {
            this.motoristaForm.patchValue({
              logradouro: dados.logradouro || '',
              bairro: dados.bairro || '',
              localidade: dados.localidade || '',
              uf: dados.uf || ''
            });
          } else {
            alert('CEP não encontrado.');
          }
        },
        erro => {
          alert('Erro ao buscar o CEP.');
        }
      );
    }
  }
  
  
  
}
