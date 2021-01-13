import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    // Url = 'https://api-test.vital-helth.com/api/';
    Url = 'https://api.vital-helth.com/api/';

    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * Return my Point as observable
     */
    public getBalanceService(): Observable<any> {
        return this.http.get(`${this.Url}wallets`);
    }

}
