import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FCM} from '@ionic-native/fcm/ngx';
import {NavigationExtras, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private fcm: FCM,
        private router: Router
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString('#003a58');
            this.splashScreen.hide();
            this.getFCM();
        });
    }

    getFCM() {

        this.fcm.subscribeToTopic('doctor');

        this.fcm.getToken().then(token => {
            localStorage.setItem('fcm_registration_id', token);
            //   console.log(token);
        });

        this.fcm.onNotification().subscribe(data => {
            console.log(data);
            if (data.wasTapped) {
                if (data.requestId) {
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            latitude: data.latitude,
                            longitude: data.longitude,
                            id: data.requestId,
                        }
                    };
                    this.router.navigate([`request-details/${data.requestId}`], navigationExtras);
                }
            } else {
                console.log('Received in foreground');
                if (data.requestId) {
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            latitude: data.latitude,
                            longitude: data.longitude,
                            id: data.requestId,
                        }
                    };
                    this.router.navigate([`request-details/${data.requestId}`], navigationExtras);
                }
            }
        });

        this.fcm.onTokenRefresh().subscribe(token => {
            console.log(token);
        });
    }


}

