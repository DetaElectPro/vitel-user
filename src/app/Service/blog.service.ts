import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    url = 'https://api.vital-helth.com/api/';

    constructor(private http: HttpClient,
    ) {
    }

    public getBlogProvider(): Observable<any> {
        return this.http.get(`${this.url}blog`);
    }

    /**
     * Return list of Blog as observable
     */
    public getBlogPerPageProvider(page = 0): Observable<any> {
        return this.http.get(`${this.url}blog?page=${page}`);
    }

    public getBlogByIdProvider(id): Observable<any> {
        return this.http.get(`${this.url}blog/${id}`);
    }

    searchBlogProvider(search: string): Observable<any> {
        return this.http.get(`${this.url}blog/${search}`);

    }
}
