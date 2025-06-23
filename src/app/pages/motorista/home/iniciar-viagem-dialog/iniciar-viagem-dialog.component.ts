import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-iniciar-viagem-dialog',
  standalone: true,
  templateUrl: './iniciar-viagem-dialog.component.html',
  styleUrls: ['./iniciar-viagem-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class IniciarViagemDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<IniciarViagemDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      quilometragemAtual: ['', [Validators.required, Validators.min(1)]],
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
