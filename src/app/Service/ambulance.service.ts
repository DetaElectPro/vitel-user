import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AmbulanceService {
  Url = 'https://api.vital-helth.com/api/';
 
  constructor(
      private http: HttpClient,
  ) { }

  public ambulanceRequestService(data) {
    return this.http.post(`${this.Url}ambulances`, data).pipe(
      timeout(10000),
   );
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
