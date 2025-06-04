import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-gerenciar-veiculos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './gerenciar-veiculos.component.html',
  styleUrl: './gerenciar-veiculos.component.css'
})
export class GerenciarVeiculosComponent {
  veiculoForm: FormGroup;
  tipos =['Carro', 'Van', 'Caminhão'];
  status = ['Disponível', 'Inativo', 'Em Manutenção'];

  constructor(private fb: FormBuilder){
    this.veiculoForm = this.fb.group({
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      ano: [null, [Validators.required, Validators.min(1900)]],
      quilometragemAtual: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
    })
  }

  salvar(){
    if(this.veiculoForm.valid){
      console.log(this.veiculoForm.value);
    }
  }



}
