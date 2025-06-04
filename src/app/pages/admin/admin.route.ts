import { Routes } from '@angular/router';
import { GerenciarVeiculosComponent } from './gerenciar-veiculos/gerenciar-veiculos.component'; // ajuste o caminho

export const adminRoutes: Routes = [
  {
    path: 'veiculos',
    loadComponent: () =>
      import('./gerenciar-veiculos/gerenciar-veiculos.component').then(m => m.GerenciarVeiculosComponent)
  },
  // outras rotas admin, como agendar, motoristas, etc.
];
