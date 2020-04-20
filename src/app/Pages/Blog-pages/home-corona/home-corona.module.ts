import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCoronaPageRoutingModule } from './home-corona-routing.module';

import { HomeCoronaPage } from './home-corona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCoronaPageRoutingModule
  ],
  declarations: [HomeCoronaPage]
})
export class HomeCoronaPageModule {}
