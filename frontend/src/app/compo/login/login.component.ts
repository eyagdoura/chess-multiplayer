import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  login(): void {
    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/lobby']);
      },
      error: () => {
        this.error = 'Identifiants incorrects';
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
