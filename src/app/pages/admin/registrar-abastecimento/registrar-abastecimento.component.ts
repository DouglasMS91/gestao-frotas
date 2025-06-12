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
  selector: 'app-registrar-abastecimento',
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
  templateUrl: './registrar-abastecimento.component.html',
  styleUrl: './registrar-abastecimento.component.css'
})
export class RegistrarAbastecimentoComponent {
form_abastecimento: any;
veiculo: any[] = [];
motorista: any[] = [];

constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegistrarAbastecimentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.veiculo = data.veiculos || [];
    this.motorista = data.motoristas || [];
    this.form_abastecimento = this.fb.group({
      veiculo: ['', Validators.required],
      dataAbastecimento: ['', Validators.required],
      tipo: ['', Validators.required],
      valorTotal: ['', [Validators.required, Validators.min(0)]],
      quilometragem: ['', Validators.required],
      motorista: ['', Validators.required],
    });
  }

onSubmit() {
if (this.form_abastecimento.valid) {
  const abastecimento = {
    veiculo: this.form_abastecimento.value.veiculo,
    dataAbastecimento: this.form_abastecimento.value.dataAbastecimento,
    tipo: this.form_abastecimento.value.tipo,
    valorTotal: this.form_abastecimento.value.valorTotal,
    quilometragem: this.form_abastecimento.value.quilometragem,
    motorista: this.form_abastecimento.value.motorista,
  };
  // Aqui você pode salvar o abastecimento, por exemplo, enviando para um serviço
  console.log('Abastecimento registrado:', abastecimento);
  this.dialogRef.close(abastecimento);
    } 
  }
}
