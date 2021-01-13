import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    status: number;
    topicName = 'doctor';

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private fcm: FCM,
        private router: Router,
        public alertCrtl: AlertController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.backgroundColorByHexString('#1dcc9b');
            this.splashScreen.hide();
            this.checkInternet();
            this.getFCM();
        });
    }

    getFCM() {

        this.fcm.subscribeToTopic(this.topicName);

        this.fcm.getToken().then(token => {
            localStorage.setItem('fcm_registration_id', token);
        });

        this.fcm.onNotification().subscribe(data => {
            this.status = JSON.parse(data.status);
            if (data.wasTapped) {
                switch (this.status) {
                    case 1: {
                        console.log('this status 1: ', this.status);
                        this.openRequest(data);
                        break;
                    }
                    case 2: {
                        console.log('this status 2: ', this.status);
                        this.openEmergency(data);
                        break;
                    }
                    case 3: {
                        console.log('this status 3: ', this.status);
                        this.openPharmacy(data);
                        break;
                    }

                    case 4: {
                        console.log('this status 4: ', this.status);
                        this.openBlog(data);
                        break;
                    }
                    default: {
                        console.log('this status Other: ', this.status);
                        this.normaleAlert(data, data.message, data.title);
                        break;
                    }
                }
            } else {
                console.log('Received in foreground');
                if (this.status === 1) {
                    console.log('this status for: ', this.status);

                    this.normaleAlert(data, 'new update in your last request', 'message');
                }
            }
        });

        this.fcm.onTokenRefresh().subscribe(token => {
            console.log(token);
        });
    }

    openRequest(data) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                latitude: data.latitude,
                longitude: data.longitude,
                id: data.requestId,
            }
        };
        this.router.navigate([`request-details/${data.requestId}`], navigationExtras);
    }

    openEmergency(data) {
        this.router.navigate([`emergency-details/${data.requestId}`]);
    }

    openPharmacy(data) {
        this.router.navigate([`pharmacy-details/${data.requestId}`]);
    }

    openBlog(data) {
        this.router.navigate([`blog-details/${data.requestId}`]);
    }

    async normaleAlert(data, messageRes, headerRes) {
        const alert = await this.alertCrtl.create({
            header: headerRes,
            message: messageRes,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.openRequest(data);
                    }
                }
            ]
        });

        await alert.present();
    }


    checkInternet() {
        window.addEventListener('offline', () => {
            this.presentAlert('no internet connection', 'please check your internet, and try again');
        });
    }

    async presentAlert(messageRes, headerRes) {
        const alert = await this.alertCrtl.create({
            header: headerRes,
            message: messageRes,
            cssClass: 'danger',
            buttons: ['OK']
        });

        await alert.present();
    }


}