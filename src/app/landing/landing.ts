import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
  imports: [ FormsModule, CommonModule ],
  standalone: true
})
export class LandingComponent {
  step = 1;
  username = '';
  password = '';
  confirmPassword = '';
  usernameTaken = false;

  constructor(private authService: AuthService) {}

  async nextStep() {
    this.usernameTaken = await this.authService.isUsernameTaken(this.username);
    if (!this.usernameTaken && this.username) {
      this.step = 2;
    }
  }

  async register() {
    if (this.password && this.password === this.confirmPassword) {
      const result = await this.authService.register(this.username, this.password);
      if (result) {
        console.log('User registered successfully');
        // Redirect to user profile or login
      } else {
        console.log('Error registering user');
      }
    }
  }
}
