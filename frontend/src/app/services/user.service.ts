import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {



  constructor(private http: HttpClient) { }

  getOnlineUsers() {
    return this.http.get<string[]>(
      'http://localhost:8080/api/users/online'
    );
  }

}
