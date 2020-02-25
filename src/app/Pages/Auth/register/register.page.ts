import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerData: any = {name: '', phone: '', password: '', role: 3};

    result: any;

    constructor(private authServe: AuthService) {
    }

    ngOnInit() {
    }

    userRegister() {
        this.authServe.registerServes(this.registerData)
            .then(data => {
                this.result = data;
                console.log(data);
                if (this.registerData.error) {
                    alert('error data');
                } else {
                    console.log('data: ', this.registerData);
                    console.log('token: ', this.registerData.token);
                    localStorage.setItem('token', this.registerData.token);
                    alert('ok');
                }
            })
            .catch(err => {
                console.log('serve Error: ', err);
            });
    }
}
