import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CvUploadPageRoutingModule } from './cv-upload-routing.module';

import { CvUploadPage } from './cv-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CvUploadPageRoutingModule
  ],
  declarations: [CvUploadPage]
})
export class CvUploadPageModule {}
