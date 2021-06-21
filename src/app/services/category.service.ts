import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { HttpPaginatedResponse } from '../interfaces/http-paginated-response';
import { HttpResponse } from '../interfaces/http-response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private BASE_URL = `${env.apiUrl}/Categories`;

  constructor(private http: HttpClient) {}

  populateCategories(
    filter = '',
    sortColumn = 'code',
    sortOrder = 'asc',
    pageNumber = 1,
    pageSize = 3
  ): Observable<HttpPaginatedResponse> {
    //TODO define a response Interface or Class
    //TODO implement INTERCEPTORS
    return this.http.get<HttpPaginatedResponse>(this.BASE_URL, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortColumn', sortColumn)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
    });
  }

  createCategory(body: any): Observable<any> {
    return this.http.post(this.BASE_URL, body, {
      headers: this.getRequestHeaders(),
    });
  }

  getCategory(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`, {
      headers: this.getRequestHeaders(),
    });
  }

  updateCategory(id: number, body: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, body, {
      headers: this.getRequestHeaders(),
    });
  }

  getRequestHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }
}
