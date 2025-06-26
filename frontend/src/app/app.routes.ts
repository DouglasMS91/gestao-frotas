import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AgendarViagemComponent } from './pages/admin/agendar-viagem/agendar-viagem.component';
import { GerenciarMotoristasComponent } from './pages/admin/gerenciar-motoristas/gerenciar-motoristas.component';
import { GerenciarVeiculosComponent } from './pages/admin/gerenciar-veiculos/gerenciar-veiculos.component';
import { RegistrarAbastecimentoComponent } from './pages/admin/registrar-abastecimento/registrar-abastecimento.component';
import { RegistrarManutencaoComponent } from './pages/admin/registrar-manutencao/registrar-manutencao.component';
import { PaginaInicialComponent } from './pages/admin/pagina-inicial/pagina-inicial.component';
import { MotoristaHomeComponent } from './pages/motorista/home/motorista-home.component';
import { MOTORISTA_ROUTES } from './pages/motorista/motorista.route';
import { ADMIN_ROUTES } from './pages/admin/admin.route';
import { AdminGuard } from './guards/admin.guard';
import { MotoristaGuard } from './guards/motorista.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login', loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },

  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: ADMIN_ROUTES
  },
  
  {
    path: 'motorista',
    canActivate: [MotoristaGuard],
    children: MOTORISTA_ROUTES
  },
];
