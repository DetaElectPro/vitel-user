import {Component, OnInit} from '@angular/core';
import {ActionSheetController, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {AuthService} from '../../../Service/auth.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    userInfo: any;
    response: any;

    constructor(
        private platform: Platform,
        private storage: Storage,
        public router: Router,
        private userServ: AuthService,
        public actionSheetController: ActionSheetController
    ) {
    }

    ngOnInit(): void {
        this.storage.get('userInfo')
            .then(res => {
                this.userInfo = res;
            })
            .catch(err => {
                console.log(err);
            });

        this.platform.ready().then(() => {
            // console.log('Fcm: ', localStorage.getItem('fcm_registration_id'));
            if (localStorage.getItem('fcm_registration_id') === null || localStorage.getItem('fcm_registration_id') === undefined) {
            } else {
                this.updateFcmToken();
            }
        });
    }


    ionViewDidEnter() {
        this.getDashboardData();
    }

    getDashboardData() {
        this.userServ.checkUserService()
            .subscribe(response => {
                this.response = response;

                if (this.response.status === true) {
                } else {
                    // alert('filed');
                }
            }, error => {
                console.log('server: ', error);
            });
    }

    async updateFcmToken() {
        const data = {
            fcm_registration_id: localStorage.getItem('fcm_registration_id')
        };

        await this.userServ.updateFcmToken(data)
            .subscribe(response => {
                // console.log('Fcm update res: ', response);
                // if (this.response.status === true) {
                // } else {
                //     alert('filed');
                // }
            }, error => {
                console.log('server: ', error);
            });
    }

    async ambulanceActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Ambulances Services',
            buttons: [{
                text: 'Create Request',
                icon: 'assets/icon/file-document2.svg',
                handler: () => {
                    this.router.navigate(['/ambulance']);
                }
            }, {
                text: 'browser',
                icon: 'assets/icon/clinic-history.svg',
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
                icon: 'assets/icon/file-document2.svg',
                handler: () => {
                    this.router.navigate(['/requests']);
                }
            }, {
                text: 'History',
                icon: 'assets/icon/clinic-history.svg',
                handler: () => {
                    this.router.navigate(['/history']);
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
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
                icon: 'assets/icon/file-document2.svg',
                handler: () => {
                    this.router.navigate(['/emergency-pages-request']);
                }
            }, {
                text: 'History',
                icon: 'assets/icon/clinic-history.svg',
                handler: () => {
                    this.router.navigate(['/emergency-pages-history']);
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
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
                text: 'Last Request',
                icon: 'assets/icon/clinic-history.svg',
                handler: () => {
                    this.router.navigate(['/pharmacy']);
                }
            }, {
                text: 'Your Request history',
                icon: 'list-circle-outline',
                handler: () => {
                    this.router.navigate(['/pharmacy-history']);
                }
            },
                {
                    text: 'Your Accept history',
                    icon: 'list-circle-outline',
                    handler: () => {
                        this.router.navigate(['/accept-pharmacy']);
                    }
                }, {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                    }
                }]
        });
        await actionSheet.present();
    }
}
