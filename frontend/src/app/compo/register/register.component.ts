import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username = '';
  password = '';
  error = '';
  success = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  register(): void {
    this.auth.register({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.success = 'Compte créé avec succès';
        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      error: () => {
        this.error = 'Utilisateur déjà existant';
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }
}
