import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { provideNgxMask } from 'ngx-mask';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



@Component({
  selector: 'app-form-motoristas',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIcon,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './form-motoristas.component.html',
  styleUrl: './form-motoristas.component.css'
})
export class FormMotoristasComponent {
formMotorista!: FormGroup;

constructor(
  private fb: FormBuilder,
  private http: HttpClient,
  public dialogRef: MatDialogRef<FormMotoristasComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
    this.formMotorista = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      cnh: ['', [Validators.required]],
      validade_cnh: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      logradouro: [''],
      bairro: [''],
      localidade: [''],
      uf: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (data) {
      this.formMotorista.patchValue(data.motorista);
    }
  }

  onSubmit() {
    if (this.formMotorista.valid) {
      const motoristaData = this.formMotorista.value;
      this.dialogRef.close(motoristaData);
      console.log(motoristaData);
   }
  }

  onClose() {
    this.dialogRef.close();
  }


  buscarCep() {
  const cepControl = this.formMotorista.get('cep');
  if (!cepControl?.value) return;

  const cep = cepControl.value.replace(/\D/g, '');

  this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
    next: (data) => {
      if (!data.erro) {
        this.formMotorista.patchValue({
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        });
      } else {
        alert('CEP não encontrado!');
        this.formMotorista.patchValue({
          logradouro: '',
          bairro: '',
          localidade: '',
          uf: '',
        });
      }
    },
    error: () => {
      alert('Erro ao buscar CEP!');
      this.formMotorista.patchValue({
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
      });
    },
  });
}

}
