import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    Url = 'http://localhost:8000/api/';
    private myHeaders: any;
    token = `Bearer ${localStorage.getItem('token')}`;

    constructor(
        private http: HttpClient
    ) {
        this.myHeaders = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', this.token)
        };
    }
}
