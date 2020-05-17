import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AuthService} from '../../../Service/auth.service';
import {Router} from '@angular/router';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';

@Component({
    selector: 'app-tab2',
    templateUrl: 'setting.page.html',
    styleUrls: ['setting.page.scss']
})
export class SettingPage implements OnInit {
    token: any;
    userInfo: any;


    constructor(
        private storage: Storage,
        private iab: InAppBrowser,
        private authServ: AuthService,
        private androidPermissions: AndroidPermissions,
        private route: Router) {
        this.token = this.storage.get('access_token');

        // this.checkCameraStoregPermission();
        this.checkStoregPermission();

    }

    async logOut() {
        await this.authServ.logout()
            .then(res => {
                this.route.navigate(['/account-type']);
            })
            .catch(err => {
                alert(err);
                this.route.navigate(['/']);

            });
    }

    ngOnInit(): void {
        this.storage.get('userInfo')
            .then(res => {
                this.userInfo = res;
            })
            .catch(erro => {
                alert(erro);
            });
    }

    openPrivacyPolicy() {
        const browser = this.iab.create('https://medical.detatech.xyz/privacy_policy');
        browser.on('loadstop').subscribe(event => {
                console.log('sus: ', event);
            },
            error => {
                console.log('error: ', error);
            });
    }

    openTermsAndConditions() {
        const browser = this.iab.create('https://medical.detatech.xyz/terms_and_conditions');
        browser.on('loadstop').subscribe(event => {
                console.log('sus: ', event);
            },
            error => {
                console.log('error: ', error);
            });
    }

    // checkCameraStoregPermission() {
    //     this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    //         result => {
    //             if (result.hasPermission) {
    //
    //                 this.requestCameraermission();
    //             } else {
    //                 this.requestCameraermission();
    //             }
    //         },
    //         err => {
    //             alert(err);
    //         }
    //     );
    // }

    checkStoregPermission() {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
            result => {
                if (result.hasPermission) {

                    this.requestSTORAGEPermission();
                } else {
                    this.requestSTORAGEPermission();
                }
            },
            err => {
                alert(err);
            }
        );
    }


    // requestCameraermission() {
    //     this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMER).then(
    //         () => {
    //             console.log('true');
    //         }
    //     ).catch(error => {
    //         alert('Error requesting Camera permissions');
    //     });
    // }

    requestSTORAGEPermission() {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
            () => {
                console.log('true');
            }
        ).catch(error => {
            console.log('error: ', error);

            alert('Error requesting STORAGE permissions');
        });
    }

}
