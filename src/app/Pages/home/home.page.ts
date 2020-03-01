import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-tab1',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    userInfo: any;

    constructor() {

        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }

    ngOnInit(): void {
        console.log(this.userInfo);
    }


}
