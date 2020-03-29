import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {
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
   * Show my History request
   */
  // public addEmergency(data): Observable<any> {
  //   return this.http.post(`${this.Url}emergency_serviced`, data, this.myHeaders);
  // }
  public addEmergency(data): Observable<any> {
    return this.http.get(`${this.Url}emergency_serviced`, this.myHeaders);
  }

  /**
   * Return list of History as observable
   */
  public getEmergency(page = 0): Observable<any> {
    return this.http.get(`${this.Url}emergency_serviced?page=${page}`, this.myHeaders);
  }

  public userEmergencyHistory(page = 0): Observable<any> {
    return this.http.get(`${this.Url}emergency_serviced_user_history?page=${page}`, this.myHeaders);
  }

  public search(search): Observable<any> {
    return this.http.get(`${this.Url}emergency_serviced_search/${search}`, this.myHeaders);
  }

  public getRequestById(id): Observable<any> {
    return this.http.get(`${this.Url}emergency_serviced/${id}`, this.myHeaders);
  }

  public userRequestEmergency(id, data): Observable<any> {
    return this.http.post(`${this.Url}emergency_serviced_user_emergency/${id}`, data, this.myHeaders);
  }

  public userCancleRequestEmergency(id,): Observable<any> {
    return this.http.get(`${this.Url}emergency_serviced_emergency/${id}`, this.myHeaders);
  }


}
