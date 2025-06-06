import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';



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

  constructor(private fb: FormBuilder) {
    this.cadastrar_veiculo_form = this.fb.group({
      placa: [''],
      modelo: [''],
      tipo: [''],
      ano: [''],
      quilometragemAtual: [''],
      status: [''],
    });
  }

    btn_Salvar() {
    console.log(this.cadastrar_veiculo_form.value);
  }
}
