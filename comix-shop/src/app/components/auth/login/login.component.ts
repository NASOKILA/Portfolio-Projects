import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  login(f: NgForm) {
    const username = f.value.username;
    const password = f.value.password;

    this.authService.login({ username, password })
      .toPromise().then((data: any) => {

        this.authService.authtoken = data._kmd.authtoken;
        this.authService.username = data.username;
        this.authService.email = data.email;

        if (data._kmd.hasOwnProperty('roles')) {
          this.authService.role = "Admin";
        }
        else {
          this.authService.role = "User";
        }

        localStorage.setItem('authtoken', this.authService.authtoken);
        localStorage.setItem('username', this.authService.username);
        localStorage.setItem('email', this.authService.email);
        localStorage.setItem('role', this.authService.role);

        this.toastr.success('Login successfull!', 'Success!');
        this.router.navigate(['/home']);
      })
      .catch(err => this.toastr.error(err.error.error, 'Error!'))

  }

}
