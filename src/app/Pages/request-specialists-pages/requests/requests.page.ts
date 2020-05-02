import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from '../../../Service/requests.service';
import {IonInfiniteScroll} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.page.html',
    styleUrls: ['./requests.page.scss'],
})

export class RequestsPage implements OnInit {
    @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

    // requestsData: any = [];
    imageNumber: number;
    result: any;
    requestsData: any;
    requestsSearch: any;
    dataNotFound: boolean;
    page: number;
    perPage = 0;
    totalData: number;
    totalPage: number;
    private errorMessage: any;


    constructor(
        private requestService: RequestsService,
        private route: Router,
    ) {
    }

    ngOnInit() {
        this.loadRequests();
        this.imageNumber = Math.round(Math.random() * 5);

    }

    loadRequests() {
        this.requestService.getRequest().subscribe(
            res => {
                this.result = res;
                this.requestsData = this.result.data;
                this.perPage = this.result.per_page;
                this.page = this.result.current_page;
                this.totalData = this.result.total;
                this.totalPage = this.result.total_pages;
                this.requestsData = this.result.data;
            },
            err => {
                console.log(err);
            });
    }


    searchRequests() {
        this.requestService.searchRequestsSecialists(this.requestsSearch).subscribe(
            resp => {
                if (resp.count > 0) {
                    this.requestsData = resp;
                    this.dataNotFound = false;
                } else {
                    this.requestsData = [];
                    this.dataNotFound = true;
                }
                // console.log('Search Result', resp);
            },
            err => {
                console.log(err);
            }
        );
    }

    clearSearch() {
        this.loadRequests();
    }


    loadData(event) {
        this.page = this.page + 1;
        setTimeout(() => {
            this.requestService.getRequest(this.page)
                .subscribe(
                    res => {
                        this.result = res;
                        // this.requestsData = this.result.data;
                        this.perPage = this.result.per_page;
                        this.totalData = this.result.total;
                        this.totalPage = this.result.total_pages;
                        const length = this.result.data.length;
                        for (let i = 0; i < length; i++) {
                            this.requestsData.push(this.result.data[i]);
                        }
                    }),
                event.target.complete();
            this.toggleInfiniteScroll();
        }, 1000);

    }

    doRefresh(event) {
        this.loadRequests();

        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }

    openDetails(item) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                latitude: item.latitude,
                longitude: item.longitude,
                id: item.id,
            }
        };
        this.route.navigate([`request-details/${item.id}`], navigationExtras);
    }
}
