import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  private api = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  getOnlineUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/online`);
  }
}
