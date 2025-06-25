// finalizar-viagem-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-finalizar-viagem-dialog',
  standalone: true,
  templateUrl: './finalizar-viagem-dialog.component.html',
  styleUrls: ['./finalizar-viagem-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class FinalizarViagemDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FinalizarViagemDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      quilometragemFinal: ['', [Validators.required, Validators.min(1)]],
      observacoes: ['']
    });
  }

  confirmar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
