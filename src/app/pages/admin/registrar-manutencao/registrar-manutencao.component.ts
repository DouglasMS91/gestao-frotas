import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-manutencao',
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
  templateUrl: './registrar-manutencao.component.html',
  styleUrl: './registrar-manutencao.component.css'
})
export class RegistrarManutencaoComponent {
  form_manutencao: any;
  veiculos: any[] = ['Fox', 'Gol', 'Civic', 'Corolla']; // Example vehicle list

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegistrarManutencaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.veiculos = data.veiculos || [];
    this.form_manutencao = this.fb.group({
      veiculo: ['', Validators.required],
      dataManutencao: ['', Validators.required],
      tipo: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      quilometragemAtual: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form_manutencao.valid) {
      const manutencao = {
        veiculo: this.form_manutencao.value.veiculo,
        dataManutencao: this.form_manutencao.value.dataManutencao,
        tipo: this.form_manutencao.value.tipo,
        valor: this.form_manutencao.value.valor,
        quilometragemAtual: this.form_manutencao.value.quilometragem,
        descricao: this.form_manutencao.value.descricao,
      };
      this.dialogRef.close(manutencao);
    }
    console.log(this.form_manutencao.value);
  }
}


