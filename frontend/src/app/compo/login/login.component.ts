import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  login() {
    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/lobby']);
    });
  }
}
