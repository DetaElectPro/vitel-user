import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    Url = 'https://medical.detatech.xyz/api/';

    constructor(
        private http: HttpClient
    ) {
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
     * Return list of places as observable
     */
    public getRequest(page = 0): Observable<any> {
        // return this.http.get(`${this.Url}requestSpecialists?${this.getByPage(page)}`);
        return this.http.get(`${this.Url}requestSpecialists`);
    }


    /**
     * Search places by title
     */
    public searchPlaces(title: string): Observable<any> {
        console.log('Search params', title);
        return this.http.get(`${this.Url}requests?search=${title}`);
    }

}
