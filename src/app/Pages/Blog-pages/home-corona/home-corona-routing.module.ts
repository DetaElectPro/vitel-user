import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeCoronaPage } from './home-corona.page';

const routes: Routes = [
  {
    path: '',
    component: HomeCoronaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCoronaPageRoutingModule {}
