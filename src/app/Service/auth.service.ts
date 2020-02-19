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
    url = 'https://medical.detatech.xyz/api/auth/';


    authenticationState = new BehaviorSubject(false);

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
        this.storage.get(TOKEN_KEY).then(res => {
            if (res) {
                this.authenticationState.next(true);
            }
        });
    }

    // login(login): Observable<any> {
    //     const loginData = this.http.post(`${this.url}auth/login`, login);
    //     console.log(loginData);
    //     return this.storage.set(TOKEN_KEY, 'loginData').then(() => {
    //         this.authenticationState.next(true);
    //     });
    // }

    logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
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
}
