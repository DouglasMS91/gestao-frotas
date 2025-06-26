import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AuthService, LoginRequest, LoginResponse } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginapp',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  erroLogin = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request: LoginRequest = this.loginForm.value;

    this.authService.login(request).subscribe({
      next: (usuario: LoginResponse) => {
        this.erroLogin = false;
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Redireciona de acordo com o perfil
        switch (usuario.perfil) {
          case 'ADMINISTRADOR':
            this.router.navigate(['/admin']);
            break;
          case 'MOTORISTA':
            this.router.navigate(['/motorista']);
            break;
          default:
            console.warn('Perfil não reconhecido:', usuario.perfil);
        }
      },
      error: (error: any) => {
        console.error('Erro ao fazer login:', error);
        this.erroLogin = true;
      }
    });
  }
}
