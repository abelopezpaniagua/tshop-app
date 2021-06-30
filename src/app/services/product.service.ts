import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { HttpPaginatedResponse } from '../interfaces/http-paginated-response';
import { HttpResponse } from '../interfaces/http-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private BASE_URL = `${env.apiUrl}/Products`;

  constructor(private http: HttpClient) {}

  populateProducts(
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

  deleteProduct(id: string): Promise<any> {
    return this.http
      .delete(`${this.BASE_URL}/${id}`, {
        headers: this.getRequestHeaders(),
      })
      .toPromise();
  }

  getRequestHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }
}
