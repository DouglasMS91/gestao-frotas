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
    
    this.formMotorista.get('cep')?.valueChanges.subscribe(() => {
      this.cepNaoEncontrado = false;
    });
    
    
    if (data) {
      this.formMotorista.patchValue(data.motorista);
    }
  }
  
  onSubmit() {
    if (this.formMotorista.valid) {
      const motoristaData = this.formMotorista.value;

          const motoristaParaEnviar = {
      ...motoristaData,
      validade_cnh: motoristaData.validade_cnh
        ? this.formatarDataISO(motoristaData.validade_cnh)
        : null
    };
      this.dialogRef.close(motoristaData);
    }
  }
  
  onClose() {
    this.dialogRef.close();
  }
  
  cepNaoEncontrado = false;
  
  buscarCep() {
    const cepControl = this.formMotorista.get('cep');
    if (!cepControl?.value) return;
    
    const cep = cepControl.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
      this.cepNaoEncontrado = true;
      this.limparCamposEndereco();
      return;
    }
    
    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (data) => {
        if (!data.erro) {
          this.cepNaoEncontrado = false;
          cepControl?.setErrors(null);
          this.formMotorista.patchValue({
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf,
          });
        } else {
          this.setCepNotFoundError();
          //this.cepNaoEncontrado = true;
          //this.limparCamposEndereco();
        }
      },
      error: () => {
        this.setCepNotFoundError();
        //this.cepNaoEncontrado = true;
        //this.limparCamposEndereco()
      },
    });
  }
  
  limparCamposEndereco(){
    this.formMotorista.patchValue({
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
    })
  }
  
  setCepNotFoundError() {
    this.cepNaoEncontrado = true;
    const cepControl = this.formMotorista.get('cep');
    cepControl?.setErrors({ notFound: true });
    this.limparCamposEndereco();
  }
  formatarDataISO(data: any): string {
  if (!data) return '';
  const d = new Date(data);
  const ano = d.getFullYear();
  const mes = (d.getMonth() + 1).toString().padStart(2, '0');
  const dia = d.getDate().toString().padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}
 
  
}
