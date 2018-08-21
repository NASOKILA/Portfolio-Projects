import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean;
  isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit() {
    this.isAdmin = localStorage.getItem("role") === "Admin" ? true : false;
    this.isAuthenticated = localStorage.getItem("authtoken") ? true : false;
  }

  logout() {

    this.authService.logout()
      .toPromise()
      .then(() => {
        this.authService.authtoken = null;
        this.authService.email = null;
        this.authService.role = null;
        this.authService.username = null;
        localStorage.clear();

        this.router.navigate(['/auth/login']);
        this.toast.success('Logout successfull!', 'Success!');
      }).catch(err => this.toast.error(err.error.error, 'Error!'));
  }
}
