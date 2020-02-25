import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../Service/requests.service';
import {History} from '../../Models/history';

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

    resultData: any;
    historyData: History;
    errorHand: any;

    constructor(
        private historyServ: RequestsService
    ) {
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.historyServ.requestSpecialistsHistory()
            .subscribe(res => {
                    this.historyData = res;
                },
                error =>
                    this.errorHand = error
            );
    }
}
