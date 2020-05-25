import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginData = {phone: null, password: null, role: null, fcm_registration_id: null};
    usersData: any = [];
    account: any = {type: null, role: null};
    showPass = false;
    passIcon = 'eye-outline';
    LoginForm: FormGroup;

    constructor(
        private authServe: AuthService,
        private router: Router,
        public activatedRoute: ActivatedRoute,
        public loadingController: LoadingController,
        public toastController: ToastController
    ) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.loginData.role = params.role;
            this.account.type = params.type;
        });


        this.LoginForm = new FormGroup({
            phone: new FormControl('', [Validators.required,
                Validators.pattern('(^9\\d{8}$)|(^1\\d{8}$)'),
                Validators.minLength(9), Validators.maxLength(9)]),
            password: new FormControl('', [Validators.required,
                Validators.minLength(6), Validators.maxLength(25)]),
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
                await loading.dismiss();
                this.usersData = response;
                if (this.usersData.error) {
                    this.errorToast(this.usersData.message);
                } else {
                    this.passToast(this.usersData.message);
                    if (this.usersData.user.status === 1) {
                        this.passToast(this.usersData.message);
                        await this.router.navigate(['/medical-board']);
                    }
                    if (this.usersData.user.status === 2 || this.usersData.user.status === 3) {
                        this.passToast(this.usersData.message);
                        await this.router.navigate(['/tabs/home']);
                    }
                }
            })
            .catch(async err => {
                    await loading.dismiss();
                    this.errorToast('Server Error check your internet or try later');
                    console.log('serve Error: ', err);
                }
            );
    }

    showPassword() {
        this.showPass = !this.showPass;
        if (this.passIcon === 'eye-outline') {
            this.passIcon = 'eye-off-outline';
        } else {
            this.passIcon = 'eye-outline';
        }
    }

    async errorToast(messageRes) {
        const toast = await this.toastController.create({
            message: messageRes,
            duration: 7000,
            color: 'danger',
            position: 'middle',
        });
        toast.present();
    }

    async passToast(messageRes) {
        const toast = await this.toastController.create({
            message: messageRes,
            duration: 7000,
            color: 'success',
            position: 'middle',
        });
        toast.present();
    }
}
