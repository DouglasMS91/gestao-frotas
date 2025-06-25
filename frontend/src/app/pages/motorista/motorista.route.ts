import { Routes } from '@angular/router';
import { MotoristaHomeComponent } from './home/motorista-home.component';
import { MotoristaLayoutComponent } from './layout/motorista-layout/motorista-layout.component';
import { OcorrenciasComponent } from './ocorrencias/ocorrencias.component';
import { HistoricoComponent } from './historico/historico.component';


export const MOTORISTA_ROUTES: Routes = [
  {
    path: '',
    component: MotoristaLayoutComponent,
    children: [
      {
        path: '',
        component: MotoristaHomeComponent
      },
      {
        path: 'ocorrencias',
        loadComponent: () => import('./ocorrencias/ocorrencias.component').then(m => m.OcorrenciasComponent)
      },
      {
        path: 'historico',
        loadComponent: () => import('./historico/historico.component').then(m => m.HistoricoComponent)
      },
      {
        path: 'home',
        loadComponent: () =>
        import('./home/motorista-home.component').then(m => m.MotoristaHomeComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
