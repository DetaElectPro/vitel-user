import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginData = {phone: null, password: null, role: null, fcm_registration_id: null};
    usersData: any = [];
    account: any = {type: null, role: null};

    constructor(
        private authServe: AuthService,
        private router: Router,
        public activatedRoute: ActivatedRoute,
        public loadingController: LoadingController
    ) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.loginData.role = params.role;
            this.account.type = params.type;
            console.log(params);
        });
    }

    ngOnInit() {
        this.loginData.fcm_registration_id = localStorage.getItem('fcm_registration_id');
    }


    async userLogin() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            spinner: 'bubbles',
            translucent: true,

        });
        await loading.present();
        this.authServe.loginServes(this.loginData)
            .then(async response => {
                console.log(response);
                await loading.dismiss();
                this.usersData = response;
                if (this.usersData.error) {
                    alert('error data');
                } else {
                    if (this.usersData.user.status === 1) {
                        await this.router.navigate(['/medical-board']);
                    }
                    if (this.usersData.user.status === 2 || this.usersData.user.status === 3) {
                        await this.router.navigate(['/']);
                    }
                }
            })
            .catch(async err => {
                    await loading.dismiss();
                    console.log('serve Error: ', err);
                }
            );
    }
}
