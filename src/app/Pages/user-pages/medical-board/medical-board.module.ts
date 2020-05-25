import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { MedicalBoardPage } from './medical-board.page';
import {IonicSelectableModule} from 'ionic-selectable';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    RouterModule.forChild([{path: '', component: MedicalBoardPage}]),

  ],
  declarations: [MedicalBoardPage]
})
export class MedicalBoardPageModule {}
