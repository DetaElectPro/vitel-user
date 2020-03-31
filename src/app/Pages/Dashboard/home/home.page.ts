import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {ActionSheetController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    userInfo: any;

    constructor(
        private storage: Storage,
        public router: Router,
        private iab: InAppBrowser,
        public actionSheetController: ActionSheetController
    ) {
        // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }

    ngOnInit(): void {
        this.storage.get('userInfo')
            .then(res => {
                this.userInfo = res;
            })
            .catch(err => {
                console.log(err);
            });
    }

    openBrow() {
        const browser = this.iab.create('https://medical.detatech.xyz/profile/' + this.userInfo.id);
        // browser.executeScript('...');
        // browser.insertCSS(...);
        // browser.on('loadstop').subscribe(event => {
        //     browser.insertCSS({code: 'body{color: red;'});
        // });

        browser.on('loadstop').subscribe(event => {
                console.log('sus: ', event);
            },
            error => {
                console.log('error: ', error);
            });
    }


    async ambulanceActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Ambulances Services',
            buttons: [{
                text: 'Create Request',
                icon: 'add-circle-outline',
                handler: () => {
                    this.router.navigate(['/ambulance']);
                }
            }, {
                text: 'browser',
                icon: 'list-circle-outline',
                handler: () => {
                    this.router.navigate(['/ambulance-history']);
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    async requestActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Requests Services',
            buttons: [{
                text: 'Browse new requests',
                icon: 'list-circle-outline',
                handler: () => {
                    this.router.navigate(['/requests']);
                }
            }, {
                text: 'History',
                icon: 'document-attach-outline',
                handler: () => {
                    this.router.navigate(['/history']);
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    async emergencyActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Requests Services',
            buttons: [{
                text: 'Browse new requests',
                icon: 'list-circle-outline',
                handler: () => {
                    this.router.navigate(['/emergency-pages-request']);
                }
            }, {
                text: 'History',
                icon: 'document-attach-outline',
                handler: () => {
                    // this.router.navigate(['/emergency-pages-history']);
                    alert('available soon');
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    async pharmacyActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'pharmacy Services',
            buttons: [{
                text: 'Find pharmacy',
                icon: 'assets/icon/pharmacy.svg',
                handler: () => {
                    this.router.navigate(['/find-pharmacy']);
                }
            }, {
                text: 'Request history',
                icon: 'list-circle-outline',
                handler: () => {
                    this.router.navigate(['/pharmacy']);
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }
}
