import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginData = {phone: '', password: '', role: 3};
    usersData: any = [];

    constructor(
        private authServe: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }


    userLogin() {
        this.authServe.loginServes(this.loginData)
            .then(data => {
                this.usersData = data;
                if (this.usersData.error) {
                    alert('error data');
                } else {
                    console.log('status: ', this.usersData.user.status);
                    localStorage.setItem('token', this.usersData.token);
                    localStorage.setItem('userInfo', JSON.stringify(this.usersData.user));
                    if (this.usersData.user.status === 1) {
                        this.router.navigate(['/medical-board']);
                    }
                    if (this.usersData.user.status === 2) {
                        this.router.navigate(['/']);
                    }
                }
            })
            .catch(err => {
                console.log('serve Error: ', err);
            });
    }
}
