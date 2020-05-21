import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    Url = 'https://api.vital-helth.com/api/';

    constructor(
        private http: HttpClient,
    ) {
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
        const data = {
            title
        };
        return this.http.post(`${this.Url}search_request_specialists`, data);
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
