import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    Url = 'https://medical.detatech.xyz/api/';
    // Url = 'http://localhost:8000/api/';
    // Url = 'http://192.168.2.6:8000/api/';
    token = `Bearer ${localStorage.getItem('token')}`;
    private myHeaders: any;

    constructor(
        private http: HttpClient,
    ) {
        this.myHeaders = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', this.token)
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
    public getRequestById(id): Observable<any> {
        return this.http.get(`${this.Url}request_specialists/${id}`);
    }

    /**
     * Return Create Requests as observable
     */
    public createRequest(data): Observable<any> {
        return this.http.post(`${this.Url}request_specialists`, data);
    }


    /**
     * Search request by title
     */
    public searchRequestsSecialists(title: string): Observable<any> {
        return this.http.get(`${this.Url}search_request_specialists/${title}`);
    }

    /**
     * Show my History request
     */

    /**
     * Return list of Requests as observable
     */
    public getRequest(page = 0): Observable<any> {
        // return this.http.get(`${this.Url}requestSpecialists?${this.getByPage(page)}`);
        return this.http.get(`${this.Url}request_specialists?page=${page}`);
    }

    public requestSpecialistsHistory(page = 0): Observable<any> {
        return this.http.get(`${this.Url}request_specialists_doctor_history?page=${page}`);
    }

    public userAcceptRequestSpecialists(id) {
        return this.http.get(`${this.Url}acceptRequestByUser/${id}`);
    }

    public cancelRequestByUser(id) {
        return this.http.get(`${this.Url}cancelRequestByUser/${id}`);
    }

}
