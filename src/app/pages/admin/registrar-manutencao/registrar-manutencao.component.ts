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
import { CommonModule, formatDate } from '@angular/common';
import { Veiculo } from '../../../models/veiculo.model';
import { VeiculoService } from '../../../services/veiculo.service';
import { MotoristaService } from '../../../services/motorista.service';

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
  form_manutencao!: FormGroup;
  motoristas: any[] = [];
  veiculos: any[] = [];
  
  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private motoristaService: MotoristaService,
    public dialogRef: MatDialogRef<RegistrarManutencaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  
  ngOnInit(): void {
    this.form_manutencao = this.fb.group({
      veiculo: [this.data?.veiculo || '', Validators.required], 
      dataManutencao: ['', Validators.required],
      valorManutencao: ['', Validators.required],
      tipoManutencao: ['', Validators.required],
      quilometragemAtual: ['', Validators.required],
      descricao: ['', Validators.required],
    });
    this.getVeiculos(); 
    this.getMotoristas();
  }
  
  onSubmit() {
    if (this.form_manutencao.valid) {
      const formValue = this.form_manutencao.value;

      const manutencao = {
        data: formValue.dataManutencao,
        valor: formValue.valorManutencao,
        tipo: formValue.tipoManutencao,
        quilometragemAtual: formValue.quilometragemAtual,
        descricao: formValue.descricao,
        veiculoId: formValue.veiculo
      };
      this.dialogRef.close(manutencao);
      console.log('Manutenção registrada:', manutencao);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

    getVeiculos() {
    this.veiculoService.getVeiculos().subscribe(v => {
      this.veiculos = v;
    });
  }

   getMotoristas() {
    this.motoristaService.getMotoristas().subscribe(m => {
      this.motoristas = m;
    });
  }
}


