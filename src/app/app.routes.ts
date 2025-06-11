import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AgendarViagemComponent } from './pages/admin/agendar-viagem/agendar-viagem.component';
import { GerenciarMotoristasComponent } from './pages/admin/gerenciar-motoristas/gerenciar-motoristas.component';
import { GerenciarVeiculosComponent } from './pages/admin/gerenciar-veiculos/gerenciar-veiculos.component';
import { RegistrarAbastecimentoComponent } from './pages/admin/registrar-abastecimento/registrar-abastecimento.component';
import { RegistrarManutencaoComponent } from './pages/admin/registrar-manutencao/registrar-manutencao.component';
import { MotoristaHomeComponent } from './pages/motorista/home/motorista-home.component';
import { MOTORISTA_ROUTES } from './pages/motorista/motorista.route';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login', loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),},

  {path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
    children: [
        {path: 'agendar-viagem', loadComponent: ()=> import('./pages/admin/agendar-viagem/agendar-viagem.component').then((m) => m.AgendarViagemComponent),},
        {path: 'gerenciar-motoristas', loadComponent: ()=> import('./pages/admin/gerenciar-motoristas/gerenciar-motoristas.component').then((m) => m.GerenciarMotoristasComponent),},
        {path: 'gerenciar-veiculos', loadComponent: () => import('./pages/admin/gerenciar-veiculos/gerenciar-veiculos.component').then((m) => m.GerenciarVeiculosComponent),},
        {path: 'registrar-abastecimento', loadComponent: ()=> import('./pages/admin/registrar-abastecimento/registrar-abastecimento.component').then((m) => m.RegistrarAbastecimentoComponent),},
        {path: 'registrar-manutencao', loadComponent: ()=> import('./pages/admin/registrar-manutencao/registrar-manutencao.component').then((m) => m.RegistrarManutencaoComponent),},
    ],
  },
  {
    path: 'motorista',
    children: MOTORISTA_ROUTES
  },
];
