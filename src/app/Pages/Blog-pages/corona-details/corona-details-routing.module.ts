import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoronaDetailsPage } from './corona-details.page';

const routes: Routes = [
  {
    path: '',
    component: CoronaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoronaDetailsPageRoutingModule {}
