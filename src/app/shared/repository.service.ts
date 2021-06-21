import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  constructor(private http: HttpClient) {}

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route));
  };

  public create = (route: string, body: any) => {
    return this.http.post(
      this.createCompleteRoute(route),
      body,
      this.generateHeaders()
    );
  };

  public update = (route: string, body: any) => {
    return this.http.put(
      this.createCompleteRoute(route),
      body,
      this.generateHeaders()
    );
  };

  public delete = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route));
  };

  private createCompleteRoute = (route: string) => {
    return `${environment.apiUrl}/${route}`;
  };

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  };
}
