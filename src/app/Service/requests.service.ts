import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    Url = 'https://medical.detatech.xyz/api/';
    private myHeaders: any;
    private TOKENKEY: string;

    constructor(
        private storage: Storage,
        private http: HttpClient
    ) {
        this.myHeaders = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        };
    }

    /**
     * Add page value url param
     */
    getByPage(page: number): string {
        if (page) {
            return '&page=' + page;
        } else {
            return '';
        }
    }

    /**
     * Return list of Requests as observable
     */
    public getRequest(page = 0): Observable<any> {
        // return this.http.get(`${this.Url}requestSpecialists?${this.getByPage(page)}`);
        return this.http.get(`${this.Url}requestSpecialists`, this.myHeaders);
    }

    /**
     * Return list of Requests as observable
     */
    public getRequestById(id): Observable<any> {
        return this.http.get(`${this.Url}requestSpecialists/${id}`, this.myHeaders);
    }


    /**
     * Search request by title
     */
    public searchPlaces(title: string): Observable<any> {
        console.log('Search params', title);
        return this.http.get(`${this.Url}requests?search=${title}`, this.myHeaders);
    }

    public userAcceptRequestSpecialists(data) {
        console.log(this.myHeaders);
        return this.http.post(`${this.Url}userAcceptRequestSpecialists`, data, this.myHeaders);
    }

}
