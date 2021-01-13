import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AmbulanceService {
    // Url = 'https://api-test.vital-helth.com/api/';
    Url = 'https://api.vital-helth.com/api/';

    constructor(
        private http: HttpClient,
    ) {
    }

    public ambulanceRequestService(data) {
        return this.http.post(`${this.Url}ambulances`, data);
    }

    public getAmbulanceService(page): Observable<any> {
        return this.http.get(`${this.Url}ambulances?page=${page}`);
    }

    public getAmbulanceByIdService(id): Observable<any> {
        return this.http.get(`${this.Url}ambulances/${id}`);
    }

    public cancelRequestByUser(id): Observable<any> {
        return this.http.delete(`${this.Url}ambulances/${id}`);
    }
}
