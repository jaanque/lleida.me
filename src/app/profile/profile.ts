import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [ CommonModule ],
  standalone: true
})
export class ProfileComponent implements OnInit {
  username: string = '';
  user: any; // Define a proper interface for the user object

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.username = username ? username : '';
    if (this.username) {
      this.authService.getUser(this.username).then(user => {
        this.user = user;
      });
    }
  }
}
