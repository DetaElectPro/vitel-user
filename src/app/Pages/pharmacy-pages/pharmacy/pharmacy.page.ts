import {Component, OnInit} from '@angular/core';
import {EmergencyService} from '../../../Service/emergency.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.page.html',
  styleUrls: ['./pharmacy.page.scss'],
})
export class PharmacyPage implements OnInit {
  pharmacyData: any;
  page: number;
  perPage = 0;
  totalData: number;
  totalPage: number;
  private errorMessage: any;
  private result: any;

  constructor(
      private pharmacyServ: EmergencyService
  ) {
  }

  ngOnInit() {
  }

  doRefresh(event) {
    this.requestData();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  requestData() {
    this.pharmacyServ.getPharmcyRequest()
        .subscribe(res => {
              this.result = res;
              this.perPage = this.result.per_page;
              this.page = this.result.current_page;
              this.totalData = this.result.total;
              this.totalPage = this.result.total_pages;
              this.pharmacyData = this.result.data.data;

            },
            error =>
                console.log('server: ', this.errorMessage = error)
        );
  }


  loadData(event) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.pharmacyServ.getPharmcyRequest(this.page)
          .subscribe(
              res => {
                this.result = res;
                // this.historyData = this.result.data;
                this.perPage = this.result.per_page;
                this.totalData = this.result.total;
                this.totalPage = this.result.total_pages;
                const length = this.result.data.length;
                for (let i = 0; i < length; i++) {
                  this.pharmacyData.push(this.result.data[i]);
                }
              }),
          event.target.complete();
    }, 1000);

  }

}
