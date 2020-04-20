import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  url = 'https://api.vital-helth.com/api/';
  constructor(private http: HttpClient,
  ) {
  }
}
