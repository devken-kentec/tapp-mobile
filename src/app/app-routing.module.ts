import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'agenda-list',
    loadChildren: () => import('./agenda-list/agenda-list.module').then( m => m.AgendaListPageModule)
  },
  {
    path: 'tarefa',
    loadChildren: () => import('./tarefa/tarefa.module').then( m => m.TarefaPageModule)
  },
  {
    path: 'tarefa-list',
    loadChildren: () => import('./tarefa-list/tarefa-list.module').then( m => m.TarefaListPageModule)
  },
  {
    path: 'financeiro',
    loadChildren: () => import('./financeiro/financeiro.module').then( m => m.FinanceiroPageModule)
  },
  {
    path: 'financeiro-list',
    loadChildren: () => import('./financeiro-list/financeiro-list.module').then( m => m.FinanceiroListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
