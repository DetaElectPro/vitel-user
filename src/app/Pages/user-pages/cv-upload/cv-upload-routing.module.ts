import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CvUploadPage } from './cv-upload.page';

const routes: Routes = [
  {
    path: '',
    component: CvUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvUploadPageRoutingModule {}
