import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';



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
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})

export class DialogComponent {
  cadastrar_veiculo_form!: FormGroup;
  //public dialogRef!: MatDialogRef<DialogComponent>

  constructor(private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogComponent>) {
    this.cadastrar_veiculo_form = this.fb.group({
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      ano: ['', Validators.required],
      quilometragemAtual: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

    btn_Salvar() {
      if(this.cadastrar_veiculo_form.valid){
        const form = this.cadastrar_veiculo_form.value;
        //form.placa = form.placa.toUpperCase();
        this.dialogRef.close(form);
        console.log(form);
      }

  }

    btn_Fechar(): void{
      this.dialogRef.close();
    }
}
