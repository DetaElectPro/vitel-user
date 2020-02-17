import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerData: any = [
        {fullname: ''},
        {phone: ''},
        {password: ''},
        {password_check: ''}
    ];

    constructor() {
    }

    ngOnInit() {
    }

    userRegister() {
        console.log('Work');
    }
}
