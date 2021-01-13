import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    token: any;
    response: any;
    user: any;
    // url = 'https://api-test.vital-helth.com/api/';
    url = 'https://api.vital-helth.com/api/';

    authenticationState = new BehaviorSubject(null);

    constructor(
        private storage: Storage,
        private plt: Platform,
        private http: HttpClient
    ) {
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }

    checkToken() {
        return new Promise((resolve, reject) => {
            this.storage.get(TOKEN_KEY)
                .then(res => {
                    if (res) {
                        this.authenticationState.next(true);
                    } else {
                        this.authenticationState.next(false);
                    }

                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    logout() {
        this.http.post(`${this.url}logout`, localStorage.getItem('token'));
        this.storage.remove('token');
        return this.storage.remove('userInfo').then(res => {
            this.storage.remove(TOKEN_KEY).then(() => {
                localStorage.removeItem('token');

                localStorage.clear();
                this.storage.clear();
                this.authenticationState.next(false);
            });
        });
    }

    isAuthenticated() {
        return new Promise((resolve, reject) => {
            this.checkToken()
                .then(res => {
                    resolve(this.authenticationState.value);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    loginServes(userData) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + 'auth/login', userData)
                .subscribe(res => {
                    this.response = res;
                    if (!this.response.error) {
                        this.token = res;
                        this.user = res;
                        this.token = this.token.token;
                        localStorage.setItem('token', this.token);
                        this.storage.set(TOKEN_KEY, this.token).then(() => {
                            this.authenticationState.next(true);
                        });
                        this.storage.set('userInfo', this.user.user).then(r =>
                            r.toString());
                        resolve(res);
                    }
                }, (err) => {
                    reject(err);
                });
        });
    }

    public resetPassword(phone): Observable<any> {
        return this.http.post(`${this.url}reset_password`, phone);
    }

    medicalBoardService(boardData) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + 'employs', boardData)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    /**
     * Return list of Requests as observable
     */
    public medicalFiledService(): Observable<any> {
        return this.http.get(this.url + 'medical_specialties');
    }

    public checkUserService(): Observable<any> {
        return this.http.get(`${this.url}auth/check_user`);
    }

    public updateFcmToken(data): Observable<any> {
        return this.http.post(`${this.url}auth/fcm_update`, data);
    }

    public getSlide(): Observable<any> {
        return this.http.get(`${this.url}home`);
    }

    public uploadCvFile(formData) {
        return this.http.post<any>(`${this.url}upload_cv`, formData);
    }

    public uploadImage(formData) {
        return this.http.post<any>(`${this.url}upload_image`, formData);
    }
}
