import { Component } from '@angular/core';
import { RouterModule,} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';



@Component({
  selector: 'app-motorista-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,],
  templateUrl: './motorista-layout.component.html',
  styleUrls: ['./motorista-layout.component.css']
})
export class MotoristaLayoutComponent {
  motoristaNome = 'Paulo Silva'; // Simulação de usuário logado mudar depois na integração com o backend
}
