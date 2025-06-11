import { Routes } from '@angular/router';
import { MotoristaHomeComponent } from './home/motorista-home.component';

export const MOTORISTA_ROUTES: Routes = [
  {
    path: '',
    component: MotoristaHomeComponent,
    title: 'Página do Motorista'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
