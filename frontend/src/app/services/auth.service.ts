import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(credentials: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.api}/login`, credentials);
  }

  register(data: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }

  online(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/online`);
  }
}
