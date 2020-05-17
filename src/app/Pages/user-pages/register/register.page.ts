import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {FileUploader, FileLikeObject} from 'ng2-file-upload';
import {FileUploadeService} from 'src/app/Service/file-uploade.service';
import {concat} from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerData: any = {name: '', phone: '', password: '', role: null, fcm_registration_id: null, image: null};

    result: any;
    showPass = false;
    passIcon = 'eye-outline';

    public fileUploader: FileUploader = new FileUploader({});

    constructor(
        private route: Router,
        public toastController: ToastController,
        public activatedRoute: ActivatedRoute,
        private authService: FileUploadeService,
        public loadingController: LoadingController
    ) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.registerData.role = params.role;
        });

    }

    ngOnInit() {
        this.registerData.fcm_registration_id = localStorage.getItem('fcm_registration_id');
    }


    getFiles(): FileLikeObject[] {
        if (this.fileUploader.queue.length > 1) {
            this.fileUploader.removeFromQueue(this.fileUploader.queue[0]);
        } else {
            return this.fileUploader.queue.map((fileItem) => {
                return fileItem.file;
            });
        }
    }

    async userRegister() {
        const files = this.getFiles();
        if (files.length === 0) {
            alert('Profile Image Required Please choose an image');
        } else {
            const loading = await this.loadingController.create({
                message: 'Please wait...',
                spinner: 'bubbles',
                translucent: true
            });

            await loading.present();
            const requests = [];
            files.forEach((file) => {
                const formData = new FormData();
                formData.append('image', file.rawFile, file.name);
                formData.append('name', this.registerData.name);
                formData.append('phone', this.registerData.phone);
                formData.append('password', this.registerData.password);
                formData.append('role', this.registerData.role);

                requests.push(this.authService.registerServes(formData));

            });

            concat(...requests).subscribe(
                async response => {
                    await loading.dismiss();
                    this.result = response;
                    if (this.result.error) {
                        this.errorToast(this.result.message);
                    } else {
                        this.presentToast(this.result.message);
                        this.toLogin();
                    }
                },
                async err => {
                    await loading.dismiss();
                    // const errs = JSON.parse(err.responseText);
                    this.errorToast('Server Error check your internet or try later');
                });
        }
    }

    async presentToast(messageRes) {
        const toast = await this.toastController.create({
            message: messageRes,
            duration: 7000,
            color: 'success',
            position: 'middle'
        });
        toast.present();
        this.route.navigate(['/']);
    }

    async errorToast(messageRes) {
        const toast = await this.toastController.create({
            message: messageRes,
            duration: 7000,
            color: 'danger',
            position: 'middle'
        });
        toast.present();
        this.route.navigate(['/']);
    }

    async toLogin() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                role: this.registerData.role,
            }
        };
        await this.route.navigate(['/login'], navigationExtras);
    }

    showPassword() {
        this.showPass = !this.showPass;
        if (this.passIcon === 'eye-outline') {
            this.passIcon = 'eye-off-outline';
        } else {
            this.passIcon = 'eye-outline';
        }
    }
}
