import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-tab1',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    userInfo: any;

    constructor(
        private storage: Storage
    ) {
        // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }

    ngOnInit(): void {
        this.storage.get('userInfo')
            .then(res => {
                this.userInfo = res;
            })
            .catch(err => {
                console.log(err);
            });
    }


}
