import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';


import {AccountTypePage} from './account-type.page';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: AccountTypePage}])
    ],
    declarations: [AccountTypePage]
})
export class AccountTypePageModule {
}
