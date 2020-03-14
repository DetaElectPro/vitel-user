import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';
import {ExploreContainerComponentModule} from '../../explore-container/explore-container.module';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx'; //add

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{path: '', component: HomePage}])
    ],
    providers: [InAppBrowser],
    declarations: [HomePage]
})
export class HomePageModule {
}
