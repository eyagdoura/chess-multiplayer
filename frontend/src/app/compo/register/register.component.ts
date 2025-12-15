import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  register() {
    this.auth.register({
      username: this.username,
      password: this.password
    }).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
