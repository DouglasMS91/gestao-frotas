import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Motorista } from '../../../models/motorista.model';
import { MotoristaService } from '../../../services/motorista.service';
import { AgendamentoService } from '../../../services/agendamento.service';
import { VeiculoService } from '../../../services/veiculo.service';
import { Veiculo } from '../../../services/veiculo.service';
import { AgendamentoCreateDTO } from '../../../models/agendamentoDTO';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})


export class AgendamentoComponent {
  formAgendamento!: FormGroup;
  veiculos: Veiculo []= [];
  motoristas: Motorista [] = [];

  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private veiculoService: VeiculoService,
    private agendamentoService: AgendamentoService,
     public dialogRef: MatDialogRef<AgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

    ngOnInit(): void {
      this.formAgendamento = this.fb.group({
        veiculo: ['', Validators.required],
        motorista: ['', Validators.required],
        data: ['', Validators.required],
        status: ['', Validators.required],
        destino: ['', Validators.required]
      })


    if (this.data?.motoristas) {
      this.motoristas = this.data.motoristas;
    } else {
      this.motoristaService.getMotoristas().subscribe(m => this.motoristas = m);
    }
    if (this.data?.veiculos) {
      this.veiculos = this.data.veiculos;
    } else {
      this.veiculoService.getVeiculos().subscribe(v => this.veiculos = v);
    }  
  }
    

 onSubmit(): void {
    if (this.formAgendamento.valid) {
      const formValue = this.formAgendamento.value;
      const dto: AgendamentoCreateDTO = {
        data: formValue.data, 
        status: formValue.status, 
        destino: formValue.destino,
        motoristaId: formValue.motorista.id ?? formValue.motorista,
        veiculoId: formValue.veiculo.id ?? formValue.veiculo,
      };
      this.agendamentoService.criarAgendamento(dto).subscribe({
        next: (novoAgendamento) => {
          this.dialogRef.close(novoAgendamento);
        },
        error: (err) => {
          console.error('Erro ao criar agendamento:', err);
        }
      });
    }
  }
}


/*
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Motorista } from '../../../models/motorista.model';
import { MotoristaService } from '../../../services/motorista.service';
import { AgendamentoService } from '../../../services/agendamento.service';
import { VeiculoService } from '../../../services/veiculo.service';
import { Veiculo } from '../../../services/veiculo.service';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})


export class AgendamentoComponent {
  formAgendamento!: FormGroup;
  veiculos: Veiculo []= [];
  motoristas: Motorista [] = [];

  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private veiculoService: VeiculoService,
    private agendamentoService: AgendamentoService,
     public dialogRef: MatDialogRef<AgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

    ngOnInit(): void {
      this.formAgendamento = this.fb.group({
        veiculo: ['', Validators.required],
        motorista: ['', Validators.required],
        data: ['', Validators.required],
        status: ['', Validators.required],
      })

      if (this.data?.motoristas) {
      this.motoristas = this.data.motoristas;
    } else {
      this.motoristaService.getMotoristas().subscribe(m => this.motoristas = m);
    }
    if (this.data?.veiculos) {
      this.veiculos = this.data.veiculos;
    } else {
      this.veiculoService.getVeiculos().subscribe(v => this.veiculos = v);
    }  
    }

   onSubmit(): void {
    if (this.formAgendamento.valid) {
      const agendamento = this.formAgendamento.value;
      this.dialogRef.close({
        ...agendamento,
        id: Date.now(),
      });
      }
    }
}
*/
