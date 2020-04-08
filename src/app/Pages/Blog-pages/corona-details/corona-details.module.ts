import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoronaDetailsPageRoutingModule } from './corona-details-routing.module';

import { CoronaDetailsPage } from './corona-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoronaDetailsPageRoutingModule
  ],
  declarations: [CoronaDetailsPage]
})
export class CoronaDetailsPageModule {}
