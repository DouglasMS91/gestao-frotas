import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';



@Component({
  selector: 'app-dialog',
  standalone:true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  templateUrl: './cadastrar-veiculo.component.html',
  styleUrl: './cadastrar-veiculo.component.css'
})

export class CadastrarVeiculoComponent {
  veiculoForm: FormGroup;
  statusOptions = ['Disponível', 'Inativo', 'Em Manutenção'];
  tipoVeiculo = ['Carro', 'Van', 'Caminhão', 'Furgão'];

  constructor(private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CadastrarVeiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.veiculoForm = this.fb.group({
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      ano: ['', Validators.required],
      quilometragemAtual: ['', Validators.required],
      status: ['', Validators.required],
    });

    if (data && data.veiculo) {
       setTimeout(() => {
           this.veiculoForm.patchValue(data.veiculo);
        });
    }
  }

    onSubmit() {
      if(this.veiculoForm.valid){
        const form = this.veiculoForm.value;
        this.dialogRef.close(form);
      }

  }
  onClose(){
    this.dialogRef.close(); 
  }

}
