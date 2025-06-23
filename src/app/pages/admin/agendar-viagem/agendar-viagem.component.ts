import { Component, Inject, OnInit} from '@angular/core';
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
import { VeiculoService } from '../../../services/veiculo.service';
import { Veiculo } from '../../../services/veiculo.service';
import { MotoristaService } from '../../../services/motorista.service';
import { Motorista } from '../../../models/motorista.model';
import { Agendamento } from '../../../models/agendamento.model';
import { AgendamentoService } from '../../../services/agendamento.service';

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
export class AgendarViagemComponent implements OnInit {
  form!: FormGroup;
  veiculos: Veiculo [] = [];
  motoristas: Motorista [] = [];
  
  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private motoristaService: MotoristaService,
    private agendamentoService: AgendamentoService,
    public dialogRef: MatDialogRef<AgendarViagemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
 
  ngOnInit(): void {
    this.form = this.fb.group({
      veiculo: ['', Validators.required],
      motorista: ['', Validators.required],
      dataSaida: ['', Validators.required],
      horaSaida: ['', Validators.required],
      destino: ['', Validators.required],
      justificativa: ['', Validators.required],
    });
    
    
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
    if (this.form.valid) {
      const formValue = this.form.value;
      const agendamento = {
        id: formValue.id,
        data: formValue.dataSaida, 
        status: formValue.status, 
        destino: formValue.destino,
        motoristaId: formValue.motorista, 
        veiculoId: formValue.veiculo
      };
      this.agendamentoService.criarAgendamento(agendamento).subscribe({
        next: (novoAgendamento) => {
          console.log('Agendamento Criado:', agendamento);
          this.dialogRef.close(novoAgendamento);
        },
        error: (err) => {
          console.error('Erro ao criar agendamento:', err);
        }
      });
    }
  }
}