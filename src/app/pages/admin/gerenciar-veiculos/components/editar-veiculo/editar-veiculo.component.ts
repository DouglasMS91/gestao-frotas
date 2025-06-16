import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { VeiculoService } from '../../../../../services/veiculo.service';





@Component({
  standalone: true,
  selector: 'app-editar-veiculo',
  templateUrl: './editar-veiculo.component.html',
  styleUrls: ['./editar-veiculo.component.css'],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule],
    
    providers: [VeiculoService]
})

export class EditarVeiculoComponent {
  veiculoForm: FormGroup;
  statusOptions = ['Disponível', 'Inativo', 'Em Manutenção'];

  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<EditarVeiculoComponent>, 
    private veiculoService: VeiculoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const veiculo = this.data;
    this.veiculoForm = this.fb.group({
      id: [veiculo.id],
      modelo: [veiculo.modelo, Validators.required],
      tipo: [veiculo.tipo, Validators.required],
      placa: [veiculo.placa, Validators.required],
      ano: [veiculo.ano, [Validators.required, Validators.min(1900)]],
      quilometragemAtual: [veiculo.quilometragemAtual, Validators.required],
      status: [veiculo.status, Validators.required],
    });

    
  }

  onSubmit(): void {
    if (this.veiculoForm.valid) {
    const veiculoAtualizado = this.veiculoForm.value;
    this.veiculoService.atualizarVeiculo(veiculoAtualizado); // <- atualiza a lista no serviço
    this.dialogRef.close(veiculoAtualizado); 
    console.log('Veículo atualizado:', veiculoAtualizado);
  }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
