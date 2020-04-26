import {Component, OnInit} from '@angular/core';
// import {AuthService} from '../../../Service/auth.service';
import {Crop, CropOptions} from '@ionic-native/crop/ngx';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx';
// import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
    selector: 'app-cv-upload',
    templateUrl: './cv-upload.page.html',
    styleUrls: ['./cv-upload.page.scss'],
})
export class CvUploadPage implements OnInit {

    croppedImagepath = '';
    isLoading = false;

    imagePickerOptions: ImagePickerOptions = {
        maximumImagesCount: 1,
        quality: 50,
    };

    cropOptions: CropOptions = {
        quality: 50
    };

    constructor(
        private crop: Crop,
        private imagePicker: ImagePicker,
        private file: File
    ) { }


    pickImage() {
        this.imagePicker.getPictures(this.imagePickerOptions).then((results) => {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < results.length; i++) {
                this.cropImage(results[i]);
            }
        }, (err) => {
            alert(err);
        });
    }

    cropImage(imgPath) {
        this.crop.crop(imgPath, this.cropOptions)
            .then(
                newPath => {
                    this.showCroppedImage(newPath.split('?')[0]);
                },
                error => {
                    alert('Error cropping image' + error);
                }
            );
    }

    showCroppedImage(ImagePath) {
        this.isLoading = true;
        const copyPath = ImagePath;
        const splitPath = copyPath.split('/');
        const imageName = splitPath[splitPath.length - 1];
        const filePath = ImagePath.split(imageName)[0];

        this.file.readAsDataURL(filePath, imageName).then(base64 => {
            this.croppedImagepath = base64;
            this.isLoading = false;
        }, error => {
            alert('Error in showing image' + error);
            this.isLoading = false;
        });
    }

    ngOnInit(): void {
    }

    // fileUrl: any = null;
    // respData: any;
    //
    // constructor(
    //     private imagePicker: ImagePicker,
    //     private crop: Crop,
    //     private transfer: FileTransfer,
    //     private uploadService: AuthService,
    // ) {
    // }
    //
    // ngOnInit() {
    // }
    //
    // cropUpload() {
    //     this.imagePicker.getPictures({maximumImagesCount: 1, outputType: 0}).then((results) => {
    //         // tslint:disable-next-line:prefer-for-of
    //         for (let i = 0; i < results.length; i++) {
    //             console.log('Image URI: ' + results[i]);
    //             this.crop.crop(results[i], {quality: 100})
    //                 .then(
    //                     newImage => {
    //                         console.log('new image path is: ' + newImage);
    //                         const fileTransfer: FileTransferObject = this.transfer.create();
    //                         const uploadOpts: FileUploadOptions = {
    //                             fileKey: 'image',
    //                             fileName: newImage.substr(newImage.lastIndexOf('/') + 1)
    //                         };
    //                         uploadOpts.headers = {
    //                             'Content-Type': 'application/json',
    //                             Accept: 'application/json',
    //                             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                             'accept-encoding': 'gzip, deflate, br',
    //                             'accept-language': 'en-US,en;q=0.9,ar;q=0.8'
    //                         };
    //                         fileTransfer.upload(newImage, 'https://api.vital-helth.com/api/upload_image', uploadOpts)
    //                             .then((data) => {
    //                                 console.log('send: ', data);
    //                                 this.respData = JSON.parse(data.response);
    //                                 console.log(this.respData);
    //                                 this.fileUrl = this.respData.fileUrl;
    //                             }, (err) => {
    //                                 console.log(err);
    //                             });
    //                     },
    //                     error => console.error('Error cropping image', error)
    //                 );
    //         }
    //     }, (err) => {
    //         console.log(err);
    //     });
    // }
}
