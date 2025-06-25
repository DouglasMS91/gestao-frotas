import { Routes } from '@angular/router';
import { GerenciarVeiculosComponent } from './gerenciar-veiculos/gerenciar-veiculos.component'; // ajuste o caminho
import { AdminComponent } from './admin.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
      component: AdminComponent,
      children: [
        {
          path: 'pagina-inicial',
          loadComponent: () =>  
            import('./pagina-inicial/pagina-inicial.component').then(
              (m) => m.PaginaInicialComponent
            ),
        },
        {
        path: 'agendar-viagem',
        loadComponent: () =>
          import('./agendar-viagem/agendar-viagem.component').then(
            (m) => m.AgendarViagemComponent
          ),
      },

      {
        path: 'gerenciar-motoristas',
        loadComponent: () =>
          import('./gerenciar-motoristas/gerenciar-motoristas.component').then(
            (m) => m.GerenciarMotoristasComponent
          ),
      },
      {
        path: 'gerenciar-veiculos',
        loadComponent: () =>
          import('./gerenciar-veiculos/gerenciar-veiculos.component').then(
            (m) => m.GerenciarVeiculosComponent
          ),
      },
      {
        path: 'registrar-abastecimento',
        loadComponent: () =>
          import('./registrar-abastecimento/registrar-abastecimento.component').then(
            (m) => m.RegistrarAbastecimentoComponent
          ),
      },
      {
        path: 'registrar-manutencao',
        loadComponent: () =>
          import('./registrar-manutencao/registrar-manutencao.component').then(
            (m) => m.RegistrarManutencaoComponent
          ),
      },
      {
        path: '',
        redirectTo: 'pagina-inicial',
        pathMatch: 'full'
      },
    ]
  }

];
