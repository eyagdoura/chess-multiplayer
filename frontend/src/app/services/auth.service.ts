import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  register(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.api}/login`, data);
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }
}
