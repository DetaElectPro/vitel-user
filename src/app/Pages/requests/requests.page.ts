import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../Service/requests.service';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.page.html',
    styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {

    requestsData: any = [];
    requestsSearch: any;
    dataNotFound: boolean;

    constructor(
        private requestService: RequestsService,
    ) {
    }

    ngOnInit() {
        this.loadRequests();
    }

    loadRequests() {
        this.requestService.getRequest().subscribe(
            res => {
                this.requestsData = res;
                // this.specialistsData = this.requestsData.specialties;
                // this.medicalData = this.specialistsData.medical;
                console.log(this.requestsData[0].name);
            },
            err => {
                console.log(err);
            });
    }


    searchRequests() {
        this.requestService.searchPlaces(this.requestsSearch).subscribe(
            resp => {
                if (resp.count > 0) {
                    this.requestsData = resp.results;
                    this.dataNotFound = false;
                } else {
                    this.requestsData = [];
                    this.dataNotFound = true;
                }
                console.log('Search Result', resp);
            },
            err => {
                console.log(err);
            }
        );
    }

    clearSearch() {
        // this.search_place = '';
        // this.loadPlaces();
        // this.data_not_found = false;
    }
}
