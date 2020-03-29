import {Component, OnInit} from '@angular/core';
import {Medicine} from '../../../Models/medicine';
import {EmergencyService} from '../../../Service/emergency.service';

@Component({
  selector: 'app-find-pharmacy',
  templateUrl: './find-pharmacy.page.html',
  styleUrls: ['./find-pharmacy.page.scss'],
})
export class FindPharmacyPage implements OnInit {
  medicine: Medicine = {address: '', company: false, dose: null, type: '', name: ''};
  response: any;

  constructor(private pharmacyServ: EmergencyService) {
  }

  ngOnInit() {
  }

  sendRequest() {
    console.log('send: ', this.medicine);
    this.pharmacyServ.sendPharmcyRequest(this.medicine)
        .subscribe(response => {
              console.log('res: ', this.response = response);
            },
            error1 =>
                console.error(error1));
  }
}
