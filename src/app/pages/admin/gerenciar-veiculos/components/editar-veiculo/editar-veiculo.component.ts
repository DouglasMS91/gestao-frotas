import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-editar-veiculo',
  templateUrl: './editar-veiculo.component.html',
  styleUrls: ['./editar-veiculo.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule]
})
export class EditarVeiculoComponent {
  veiculoForm: FormGroup;
  statusOptions = ['Disponível', 'Inativo', 'Em Manutenção'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarVeiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.veiculoForm = this.fb.group({
      modelo: [data.modelo, Validators.required],
      tipo: [data.tipo, Validators.required],
      placa: [data.placa, Validators.required],
      ano: [data.ano, [Validators.required, Validators.min(1900)]],
      km: [data.km, Validators.required],
      status: [data.status, Validators.required],
    });
  }

  onSubmit() {
    if (this.veiculoForm.valid) {
      this.dialogRef.close(this.veiculoForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
