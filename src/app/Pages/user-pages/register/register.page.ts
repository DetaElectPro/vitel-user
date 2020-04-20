import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerData: any = {name: '', phone: '', password: '', password_check: '', role: null, fcm_registration_id: null};

    result: any;
    account: any = {type: null, role: null};

    constructor(
        private authServe: AuthService,
        private route: Router,
        public activatedRoute: ActivatedRoute,
        public loadingController: LoadingController
    ) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.registerData.role = params.role;
            this.account.type = params.type;
            console.log(params);
        });
    }

    ngOnInit() {
        this.registerData.fcm_registration_id = localStorage.getItem('fcm_registration_id');
    }

    async userRegister() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
        });
        await loading.present();
        if (this.registerData.password === this.registerData.password_check) {
            this.authServe.registerServes(this.registerData)
                .then(async response => {
                    await loading.dismiss();
                    this.result = response;
                    if (this.result.error) {
                        alert(`Message: ${this.result.message}`);
                    } else {
                        // this.route.navigate(['/login']);
                        this.toLogin();
                    }
                })
                .catch(async err => {
                    const errs = JSON.parse(err.responseText);
                    console.log('serve Error: ', errs);
                    await loading.dismiss();
                });
        } else {
            await loading.dismiss();
            alert(`password don't match`);
        }
    }

    async toLogin() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                role: this.registerData.role,
            }
        };
        await this.route.navigate(['/login'], navigationExtras);
    }
}
