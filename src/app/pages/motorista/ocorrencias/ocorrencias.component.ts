import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ocorrencias',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './ocorrencias.component.html',
  styleUrls: ['./ocorrencias.component.css']
})
export class OcorrenciasComponent {
  ocorrenciaForm: FormGroup;

  veiculos = [
    { id: 1, modelo: 'Furgão A', placa: 'ABC-1234' },
    { id: 2, modelo: 'Van C', placa: 'XYZ-5678' },
    { id: 3, modelo: 'Caminhonete B', placa: 'DEF-4321' }
  ];

  constructor(private fb: FormBuilder) {
    this.ocorrenciaForm = this.fb.group({
      veiculo: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviarOcorrencia() {
    if (this.ocorrenciaForm.valid) {
      console.log('Ocorrência enviada:', this.ocorrenciaForm.value);
      // Em breve: chamada ao backend
    }
  }
}
