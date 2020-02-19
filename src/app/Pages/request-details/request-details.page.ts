import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController, AlertController} from '@ionic/angular';
import {RequestsService} from '../../Service/requests.service';
import {Requests} from '../../Models/requests';
import {Map, tileLayer, marker} from 'leaflet';

@Component({
    selector: 'app-request-details',
    templateUrl: './request-details.page.html',
    styleUrls: ['./request-details.page.scss'],
})
export class RequestDetailsPage implements OnInit {

    map: Map;
    propertyList = [];
    requestId: number;
    request: Requests = {
        address: '',
        created_at: '',
        end_time: '',
        hours: '',
        id: 0,
        price: 0,
        specialties: {id: 0, medical: {id: 0, name: ''}, name: ''},
        start_time: '',
        status: 0,
        user: {active: 0, email: null, id: 0, image: '', name: '', phone: '', status: 0},
        name
    };
    private acceptRes: any;

    constructor(
        private activeRoute: ActivatedRoute,
        private presentAlertConfirm: AlertController,
        private loadingController: LoadingController,
        public router: Router,
        public route: ActivatedRoute,
        private requestServe: RequestsService
    ) {
        this.activeRoute.params.subscribe(
            params => {
                this.requestId = params.id;
            }
        );
    }

    ngOnInit() {
        this.requestData();
    }

    async requestData() {
        if (this.route.snapshot.paramMap.get('id') !== 'null') {
            const loading = await this.loadingController.create({
                message: 'Loading...'
            });
            await loading.present();
            await this.requestServe.getRequestById(this.requestId)
                .subscribe(res => {
                    this.request = res;
                    console.log(this.request.user.name);
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
        const data = JSON.stringify({id: this.requestId, status: 1});
        this.requestServe.userAcceptRequestSpecialists(data)
            .subscribe(res => {
                    this.acceptRes = res;
                    if (this.acceptRes.accept) {
                        alert('ok');
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


    // ionViewDidEnter() {
    //     this.map = new Map('mapId3').setView([15.35663, 32.1109], 16);
    //
    //     tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //         attribution: 'edupala.com'
    //     }).addTo(this.map);
    //
    //     // fetch('./assets/data.json').then(res => res.json())
    //     //     .then(json => {
    //     //         this.propertyList = json.properties;
    //     this.leafletMap();
    //     // });
    // }
    //
    // leafletMap() {
    //     for (const property of this.propertyList) {
    //         marker([property.lat, property.long]).addTo(this.map)
    //             .bindPopup(property.city)
    //             .openPopup();
    //     }
    // }
    //
    // ionViewWillLeave() {
    //     this.map.remove();
    // }
}
