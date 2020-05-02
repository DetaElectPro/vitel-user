import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {RequestsService} from '../../../Service/requests.service';
import {Requests} from '../../../Models/requests';
import {icon, Map, marker, tileLayer} from 'leaflet';

@Component({
    selector: 'app-request-details',
    templateUrl: './request-details.page.html',
    styleUrls: ['./request-details.page.scss'],
})
export class RequestDetailsPage implements OnInit {

    map: Map;
    result: any;
    params: any;
    requestId: number;
    request: Requests = {
        name: '',
        latitude: 0, longitude: 0,
        address: '',
        created_at: '',
        end_time: '',
        number_of_hour: '',
        id: 0,
        price: 0,
        specialties: {id: 0, medical: {id: 0, name: ''}, name: ''},
        start_time: '',
        status: 0,
        user: {active: 0, email: null, id: 0, image: '', name: '', phone: '', status: 0}
    };
    private acceptRes: any;

    constructor(
        private presentAlertConfirm: AlertController,
        private loadingController: LoadingController,
        public router: Router,
        public route: ActivatedRoute,
        private requestServe: RequestsService
    ) {
        this.route.params.subscribe(
            params => {
                this.requestId = params.id;
            }
        );

        this.route.queryParams.subscribe(params => {
            this.params = params;
        });
    }

    ngOnInit() {
        this.requestData();
    }

    async requestData() {
        if (this.route.snapshot.paramMap.get('id') !== 'null') {
            const loading = await this.loadingController.create({
                message: 'Please wait...',
                spinner: 'bubbles',
                translucent: true
            });
            await loading.present();
            await this.requestServe.getRequestById(this.requestId)
                .subscribe(res => {
                    this.result = res;
                    this.request = this.result.data;
                    loading.dismiss();
                }, err => {
                    console.log(err);
                    loading.dismiss();
                });
        } else {
            // this.presentAlertConfirm.create()
        }
    }

    acceptRequest() {
        this.requestServe.userAcceptRequestSpecialists(this.requestId)
            .subscribe(res => {
                    console.log(this.acceptRes = res);
                    if (this.acceptRes.accept) {
                        this.router.navigateByUrl('/history');
                    } else {
                        alert('error');
                    }

                },
                error => {
                    this.acceptRes = error;
                    console.log(this.acceptRes);
                }
            );
    }

    cancelRequest() {
        this.requestServe.cancelRequestByUser(this.requestId)
            .subscribe(res => {
                    console.log(this.acceptRes = res);
                    if (this.acceptRes.accept) {
                        this.router.navigate(['/']);
                    } else {
                        alert('server error try again or contact with us');
                    }

                },
                error => {
                    this.acceptRes = error;
                    alert('server Error #r2 contact with us');
                    console.log(this.acceptRes);
                }
            );
    }


    async requestConfirm() {
        const alert = await this.presentAlertConfirm.create({
            header: 'Confirm!',
            message: 'Message <strong>Do you want to follow up and agree to the request?</strong>!!!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.acceptRequest();
                    }
                }
            ]
        });

        await alert.present();
    }

    async requestCancel() {
        const alert = await this.presentAlertConfirm.create({
            header: 'Confirm!',
            message: 'Message <strong>Do you want to continue and cancel the order?</strong>!!!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.cancelRequest();
                    }
                }
            ]
        });

        await alert.present();
    }


    ionViewDidEnter() {
        this.map = new Map('mapId').setView([this.params.latitude, this.params.longitude], 18);
        tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            // tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: 'detaTech.xyz'
        }).addTo(this.map);
        this.leafletMap();
    }

    leafletMap() {
        const dot = icon({
            iconUrl: 'assets/images/pin.png',
            // shadowUrl: 'dot-shadow.png',
            iconSize: [40, 40], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative..
        });
        marker([this.params.latitude, this.params.longitude],
            {
                autoPan: true, icon: dot
            }).addTo(this.map)
            .bindPopup('location')
            .openPopup();
    }

    ionViewWillLeave() {
        this.map.remove();
    }
}
