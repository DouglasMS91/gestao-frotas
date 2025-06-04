import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-cadastrar-veiculo',
  templateUrl: './cadastrar-veiculo.component.html',
  styleUrls: ['./cadastrar-veiculo.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule]
})
export class CadastrarVeiculoComponent {
  veiculoForm: FormGroup;

  statusOptions = ['Disponível', 'Inativo', 'Em Manutenção'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastrarVeiculoComponent>
  ) {
    this.veiculoForm = this.fb.group({
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      placa: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1900)]],
      km: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.veiculoForm.valid) {
      console.log(this.veiculoForm.value);
      this.dialogRef.close(this.veiculoForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
