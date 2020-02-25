import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss']
})
export class SettingPage {
  private token: string;
  image = '../assets/images/man.png';


  constructor() {
    this.token = localStorage.getItem('access_token');

  }

}
