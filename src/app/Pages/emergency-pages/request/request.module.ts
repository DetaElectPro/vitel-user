import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';


import {RequestPage} from './request.page';
import {RouterModule} from '@angular/router';
import {EmergencyTabsComponentModule} from '../../../components/emergency-tabs/emergency-tabs.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: RequestPage}]),
        EmergencyTabsComponentModule

    ],
    declarations: [RequestPage]
})
export class RequestPageModule {
}
