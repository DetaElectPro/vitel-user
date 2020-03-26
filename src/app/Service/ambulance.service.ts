import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AmbulanceService {
  Url = 'https://medical.detatech.xyz/api/';
  token = `Bearer ${localStorage.getItem('token')}`;
  myHeaders: any;

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

  public ambulanceRequestService(data) {
    return this.http.post(`${this.Url}ambulances`, data, this.myHeaders);
  }

  public getAmbulanceService(page): Observable<any> {
    return this.http.get(`${this.Url}ambulances?page=${page}`, this.myHeaders);
  }

  public getAmbulanceByIdService(id): Observable<any> {
    return this.http.get(`${this.Url}ambulances/${id}`, this.myHeaders);
  }
}
