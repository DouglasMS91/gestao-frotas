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
import { ViagemService } from '../../../services/viagem.service';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-agendar-viagem',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
  motoristas: any[] = [];
  veiculos: any[] = [];
  
  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private veiculoService: VeiculoService,
    private viagemService: ViagemService,
    public dialogRef: MatDialogRef<AgendarViagemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      veiculo: [this.data?.veiculo || '', Validators.required],
      motorista: [this.data?.motorista || '', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      destino: ['', Validators.required],
      justificativa: ['', Validators.required]
    });
    
    this.getMotoristas();
    this.getVeiculos();
    
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const viagem = {
        veiculoId: formValue.veiculo,
        motoristaId: formValue.motorista,
        agendamentoId: this.data.agendamentoId,
        data: formValue.data, 
        hora: formValue.hora,
        destino: formValue.destino,
        justificativa: formValue.justificativa,
      };
      this.viagemService.agendarViagem(viagem).subscribe({
        next: (res) => {
          this.dialogRef.close(res);
        },
        error: (err) => {
          console.error('Erro ao agendar viagem:', err);
        }
      });
    }
  }
  
  getMotoristas() {
    this.motoristaService.getMotoristas().subscribe(m => {
      this.motoristas = m;
    });
  }
  
  getVeiculos() {
    this.veiculoService.getVeiculos().subscribe(v => {
      this.veiculos = v;
    });
  }
  
}

