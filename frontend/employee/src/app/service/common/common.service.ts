import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseURL = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  postData(route: string, Data: any = {}): Observable<any> {
    const currentUser = JSON.parse(String(localStorage.getItem('currentUser')));
    const token = currentUser ? currentUser.Token.token : '';
    console.log(token);
    const headers = new HttpHeaders();
    const otherHeader = headers.append('Authorization', 'Bearer ' + token);
    return this.http.post<any>(this.baseURL + route, Data, { headers: otherHeader });
  }

  getData(route: String): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.baseURL + route, { headers })
  }
  deleteData(route: String): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.baseURL + route, { headers })
  }
  updateData(route: String, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.baseURL + route, data, { headers });
  }
}
