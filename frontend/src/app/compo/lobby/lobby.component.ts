import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user.service';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  user!: { username: string };
  users: { username: string }[] = [];
  invitation: { from: string } | null = null;
  isBrowser = false;

  constructor(
    private userService: UserService,
    private ws: WebSocketService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) return;

    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    this.user = JSON.parse(storedUser);

    this.loadOnlineUsers();

    this.ws.connect(this.user.username, (data: any) => {
      this.handleSocketMessage(data);
    });
  }

  invite(username: string): void {
    this.ws.invite(this.user.username, username);
  }

  accept(): void {
    this.ws.respond(this.user.username, this.invitation!.from, true);
    this.invitation = null;
  }

  refuse(): void {
    this.ws.respond(this.user.username, this.invitation!.from, false);
    this.invitation = null;
  }

  private loadOnlineUsers(): void {
    this.userService.getOnlineUsers()
      .subscribe(users => this.users = users);
  }

  private handleSocketMessage(data: any): void {
    if (data.type === 'INVITE') {
      this.invitation = { from: data.from };
    }

    if (data.type === 'RESPONSE') {
      if (data.accepted) {
        alert(`${data.from} a accepté votre invitation`);
      } else {
        alert(`${data.from} a refusé votre invitation`);
      }
    }
  }
}
