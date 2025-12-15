import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private api = 'http://localhost:8080/api/game';

  constructor(private http: HttpClient) { }

  history(gameId: number) {
    return this.http.get<any[]>(`${this.api}/${gameId}/moves`);
  }
}
