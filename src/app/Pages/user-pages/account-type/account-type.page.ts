import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';

@Component({
    selector: 'app-account-type',
    templateUrl: './account-type.page.html',
    styleUrls: ['./account-type.page.scss'],
})
export class AccountTypePage implements OnInit {

    account: any = {role: null, type: null};

    constructor(
        private route: Router,
    ) {
    }

    ngOnInit() {
    }


    userRegister() {
        switch (this.account.role) {
            case 4:
                this.account.type = 'Doctor';
                break;
            case 5:
                this.account.type = 'Pharmacists';
                break;
            case 6:
                this.account.type = 'nurse';
                break;
            case 7:
                this.account.type = 'other';
                break;

        }
        const navigationExtras: NavigationExtras = {
            queryParams: {
                role: this.account.role,
                type: this.account.type,
            }
        };
        this.route.navigate(['/register'], navigationExtras);
    }

    async userLogin() {
        switch (await this.account.role) {
            case 4:
                this.account.type = 'Doctor';
                break;
            case 5:
                this.account.type = 'Pharmacists';
                break;
            case 6:
                this.account.type = 'nurse';
                break;
            case 7:
                this.account.type = 'other';
                break;

        }
        const navigationExtras: NavigationExtras = {
            queryParams: {
                role: await this.account.role,
                type: await this.account.type,
            }
        };
        await this.route.navigate(['/login'], navigationExtras);
    }
}
