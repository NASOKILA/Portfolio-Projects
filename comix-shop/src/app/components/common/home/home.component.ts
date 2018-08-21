import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;
  role: string;
  isAuthenticated: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.role = this.authService.role;
    this.username = this.authService.username;
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
