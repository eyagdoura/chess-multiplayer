import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WebSocketService {

  private socket!: WebSocket;

  connect(username: string, onInvite: (data: any) => void) {
    this.socket = new WebSocket(`ws://localhost:8080/ws?username=${username}`);

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onInvite(data);
    };

    this.socket.onerror = (err) => {
      console.error('WebSocket error', err);
    };
  }



  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  invite(from: string, to: string) {
    this.socket.send(JSON.stringify({
      type: 'INVITE',
      from,
      to
    }));
  }

  respond(from: string, to: string, accepted: boolean) {
    this.socket.send(JSON.stringify({
      type: 'RESPONSE',
      from,
      to,
      accepted
    }));
  }

}
