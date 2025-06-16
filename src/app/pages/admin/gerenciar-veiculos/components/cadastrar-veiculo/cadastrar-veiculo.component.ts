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
  cadastrar_veiculo_form!: FormGroup;

  constructor(private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CadastrarVeiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cadastrar_veiculo_form = this.fb.group({
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      ano: ['', Validators.required],
      quilometragemAtual: ['', Validators.required],
      status: ['', Validators.required],
    });

    if (data && data.veiculo) {
       setTimeout(() => {
           this.cadastrar_veiculo_form.patchValue(data.veiculo);
        });
     
      console.log('Form atualizado:', this.cadastrar_veiculo_form.value);
    }
  }

    onSubmit() {
      if(this.cadastrar_veiculo_form.valid){
        const form = this.cadastrar_veiculo_form.value;
        this.dialogRef.close(form);
        console.log(form);
      }

  }
  onClose(){
    this.dialogRef.close(); 
  }

}
