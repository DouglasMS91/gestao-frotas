import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-agendar-viagem',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './agendar-viagem.component.html',
  styleUrl: './agendar-viagem.component.css'
})
export class AgendarViagemComponent {
  form: FormGroup;
  veiculos: any[] = [];
  motoristas: any[] = [];

 constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgendarViagemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.veiculos = data.veiculos || [];
    this.motoristas = data.motoristas || [];
    this.form = this.fb.group({
      veiculo: ['', Validators.required],
      motorista: ['', Validators.required],
      dataSaida: ['', Validators.required],
      horaSaida: ['', Validators.required],
      destino: ['', Validators.required],
      justificativa: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const agendamento = {
        veiculo: this.form.value.veiculo,
        motorista: this.form.value.motorista,
        dataSaida: this.form.value.dataSaida,
        horaSaida: this.form.value.horaSaida,
        justificativa: this.form.value.justificativa,
        status: 'AGENDADO'
      };
      this.dialogRef.close(agendamento);
    }
    console.log(this.form.value);
  }
}
