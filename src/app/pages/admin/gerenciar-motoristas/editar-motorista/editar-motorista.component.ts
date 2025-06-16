import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MotoristaService } from '../../../../services/motorista.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    MatButtonModule],

    providers: [MotoristaService]
})

export class EditarMotoristaComponent {
  motoristaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarMotoristaComponent>,
    private motoristaService: MotoristaService,
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
      endereco: [motorista.endereco, Validators.required],
      email: [motorista.email, Validators.required],
      senha: [motorista.senha, Validators.required]
    });
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
}
