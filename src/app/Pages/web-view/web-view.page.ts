import {Component, OnInit} from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';


@Component({
    selector: 'app-web-view',
    templateUrl: './web-view.page.html',
    styleUrls: ['./web-view.page.scss'],
})
export class WebViewPage implements OnInit {

    constructor(private iab: InAppBrowser) {
    }

    ngOnInit() {
        const browser = this.iab.create('https://ionic.io', '_self', {location: 'no'});
    }

}
