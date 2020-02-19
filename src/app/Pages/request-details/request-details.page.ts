import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController, AlertController} from '@ionic/angular';
import {RequestsService} from '../../Service/requests.service';
import {Requests} from '../../Models/requests';

@Component({
    selector: 'app-request-details',
    templateUrl: './request-details.page.html',
    styleUrls: ['./request-details.page.scss'],
})
export class RequestDetailsPage implements OnInit {

    requestId: number;
    request: Requests = {
        created_at: '',
        end_time: '',
        hours: '',
        price: 0,
        specialties: {id: 0, medical: {id: 0, name: ''}, name: ''},
        start_time: '',
        status: 0,
        id: null, address: '', name: ''
    };

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
                    console.log(res);
                    this.request = res;
                    loading.dismiss();
                }, err => {
                    console.log(err);
                    loading.dismiss();
                });
        } else {
            // this.presentAlertConfirm.create()
        }
    }

}
