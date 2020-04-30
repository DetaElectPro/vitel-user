import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { FileUploadeService } from 'src/app/Service/file-uploade.service';
import { concat } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerData: any = { name: '', phone: '', password: '', role: null, fcm_registration_id: null, image: null };

    result: any;
    showPass = false;
    passIcon = 'eye-outline';


    public fileUploader: FileUploader = new FileUploader({});
    public hasBaseDropZoneOver = false;
    // registerDataForm: FormGroup;

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

        // this.registerDataForm = new FormGroup({
        //     name: new FormControl('', [Validators.required, Validators.minLength(5)]),
        //     image: new FormControl('', [Validators.required, Validators.minLength(1)]),
        //     phone: new FormControl('', [Validators.required, Validators.minLength(9)]),
        //     password: new FormControl('', [Validators.required, Validators.minLength(6)]),

        // });
    }

    ngOnInit() {
        this.registerData.fcm_registration_id = localStorage.getItem('fcm_registration_id');
    }



    getFiles(): FileLikeObject[] {
        return this.fileUploader.queue.map((fileItem) => {
            return fileItem.file;
        });
    }

    async userRegister() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            spinner: 'bubbles',
            translucent: true
        });

        await loading.present();
        const files = this.getFiles();
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
                    alert(`Message: ${this.result.message}`);
                } else {
                    this.toLogin();
                }
            },
            async err => {
                await loading.dismiss();
                const errs = JSON.parse(err.responseText);
                console.log('serve Error: ', errs);
            });
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 3000,
            color: 'primary',
            position: 'middle'
        });
        toast.present();
        this.route.navigate(['/'])
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
