import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {IonicSelectableModule} from 'ionic-selectable';
import {FCM} from '@ionic-native/fcm/ngx';
import {JwtModule} from '@auth0/angular-jwt';


export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
                whitelistedDomains: ['medical.detatech.xyz'],
                // blacklistedRoutes: ['example.com/examplebadroute/']
            }
        }),
        IonicSelectableModule],
    providers: [
        StatusBar,
        SplashScreen,
        FCM,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
