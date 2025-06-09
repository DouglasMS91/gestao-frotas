import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@Component({
  selector: 'app-form-motoristas',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './form-motoristas.component.html',
  styleUrl: './form-motoristas.component.css'
})
export class FormMotoristasComponent {
  formMotorista!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formMotorista = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      cnh: ['', [Validators.required]],
      validade_cnh: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
      endereco: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
      console.log(this.formMotorista.value);
      console.log("Clicou!")
  }
}
