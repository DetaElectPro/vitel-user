import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginData = {phone: '', password: '', role: 3};
    usersData: any = [];

    constructor(
        private authServe: AuthService
    ) {
    }

    ngOnInit() {
    }

    userLogin() {
        this.authServe.loginServes(this.loginData)
            .then(data => {
                this.usersData = data;
                console.log(data);
                if (this.usersData.error) {
                    alert('error data');
                } else {
                    localStorage.setItem('token', this.usersData.token);
                    alert('ok');
                }
            })
            .catch(err => {
                console.log('serve Error: ', err);
            });
    }
}
