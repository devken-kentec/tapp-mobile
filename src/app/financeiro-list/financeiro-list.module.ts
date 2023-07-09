import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceiroListPageRoutingModule } from './financeiro-list-routing.module';

import { FinanceiroListPage } from './financeiro-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanceiroListPageRoutingModule
  ],
  declarations: [FinanceiroListPage]
})
export class FinanceiroListPageModule {}
