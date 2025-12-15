import {
  Component,
  OnInit,
  OnDestroy,
  Inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {

  currentUser: any = null;
  onlineUsers: any[] = [];

  constructor(
    private auth: AuthService,
    private ws: WebsocketService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }


    if (!this.currentUser) {
      this.router.navigate(['/']);
      return;
    }

    // 👥 Charger utilisateurs en ligne
    this.auth.online().subscribe(users => {
      this.onlineUsers = users.filter(
        u => u.id !== this.currentUser.id
      );
    });


    this.ws.connectInvitations(
      this.currentUser.username,
      msg => this.handleInvitation(msg)
    );
  }

  invite(userId: number): void {
    this.ws.sendInvitation({
      fromUserId: this.currentUser.id,
      toUserId: userId,
      status: 'INVITE'
    });
  }

  private handleInvitation(msg: any): void {


    if (
      msg.status === 'INVITE' &&
      msg.toUserId === this.currentUser.id
    ) {
      const accepted = confirm(
        `Invitation reçue. Accepter la partie ?`
      );

      msg.status = accepted ? 'ACCEPT' : 'REFUSE';
      this.ws.sendInvitation(msg);
    }


    if (msg.status?.startsWith('GAME_CREATED')) {
      const gameId = msg.status.split(':')[1];
      this.router.navigate(['/game', gameId]);
    }
  }

  ngOnDestroy(): void {
    this.ws.disconnectInvitations();
  }
}
