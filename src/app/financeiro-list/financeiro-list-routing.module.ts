import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceiroListPage } from './financeiro-list.page';

const routes: Routes = [
  {
    path: '',
    component: FinanceiroListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceiroListPageRoutingModule {}
