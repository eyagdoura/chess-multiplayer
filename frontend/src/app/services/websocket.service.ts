import { Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private client!: Client;
  private connected = false;

  private gameSubscription?: StompSubscription;
  private invitationSubscription?: StompSubscription;


  private initClient(connectHeaders: any = {}): void {
    if (this.client && this.connected) {
      return;
    }
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 0
    });



    this.client.onConnect = () => {
      console.log('✅ STOMP connected');
      this.connected = true;
    };

    this.client.onDisconnect = () => {
      console.log('🔴 STOMP disconnected');
      this.connected = false;
    };

    this.client.onStompError = frame => {
      console.error('❌ STOMP error:', frame.headers['message']);
      console.error('Details:', frame.body);
    };

    this.client.activate();
  }


  connectGame(
    gameId: number,
    username: string,
    onMove: (move: any) => void
  ): void {

    this.initClient({ username });

    const waitForConnection = setInterval(() => {
      if (this.connected) {
        clearInterval(waitForConnection);

        this.gameSubscription = this.client.subscribe(
          `/topic/game/${gameId}`,
          (msg: IMessage) => {
            onMove(JSON.parse(msg.body));
          }
        );

        console.log(`♟ Subscribed to game ${gameId}`);
      }
    }, 100);
  }

  sendMove(gameId: number, move: any): void {
    if (!this.connected) {
      console.warn('⚠ Cannot send move: STOMP not connected');
      return;
    }

    this.client.publish({
      destination: `/app/game/${gameId}/move`,
      body: JSON.stringify(move)
    });
  }

  disconnectGame(): void {
    this.gameSubscription?.unsubscribe();
  }


  connectInvitations(
    username: string,
    onMessage: (invite: any) => void
  ): void {

    this.initClient({ username });

    const waitForConnection = setInterval(() => {
      if (this.connected) {
        clearInterval(waitForConnection);

        this.invitationSubscription = this.client.subscribe(
          '/topic/invitations',
          (msg: IMessage) => {
            onMessage(JSON.parse(msg.body));
          }
        );

        console.log('📨 Subscribed to invitations');
      }
    }, 100);
  }

  sendInvitation(invitation: {
    fromUserId: number;
    toUserId: number;
    status: 'INVITE' | 'ACCEPT' | 'REFUSE';
  }): void {

    if (!this.connected) {
      console.warn('⚠ Cannot send invitation: STOMP not connected');
      return;
    }

    this.client.publish({
      destination: '/app/invite',
      body: JSON.stringify(invitation)
    });
  }

  disconnectInvitations(): void {
    this.invitationSubscription?.unsubscribe();
  }


  disconnect(): void {
    this.gameSubscription?.unsubscribe();
    this.invitationSubscription?.unsubscribe();

    if (this.client && this.connected) {
      this.client.deactivate();
      this.connected = false;
    }
  }
}
