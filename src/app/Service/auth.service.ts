import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Platform} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    token: any;
    // url = 'https://medical.detatech.xyz/api/auth/';
    url = 'http://localhost:8000/api/auth/';


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
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
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
        console.log(userData);
        return new Promise((resolve, reject) => {
            this.http.post(this.url + 'login', JSON.stringify(userData), {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
                .subscribe(res => {
                    this.token = res;
                    this.token = this.token.access_token;
                    this.storage.set(TOKEN_KEY, this.token).then(() => {
                        this.authenticationState.next(true);
                    });
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    registerServes(userData) {
        console.log(userData);
        return new Promise((resolve, reject) => {
            this.http.post(this.url + 'register', JSON.stringify(userData), {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
}
