import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  private validateForm(username: string, password: string, confirmPassword: string, email: string) {

    if (username === null || username === "" || username.trim() === "") {
      this.toastr.error('Invalid username input!', "Error!")
      return false;
    }
    else if (password === null || password === "" || password.trim() === "") {
      this.toastr.error('Invalid password input!', "Error!")
      return false;
    }
    else if (password.length < 6) {
      this.toastr.error('Password must contain a minimum of 6 characters!', "Error!")
      return false;
    }
    else if (confirmPassword === null || confirmPassword === "" || confirmPassword.trim() === "") {
      this.toastr.error('Invalid confirmPassword input!', "Error!")
      return false;
    }
    else if (password !== confirmPassword) {
      this.toastr.error('Passwords do not match!', "Error!")
      return false;
    }
    else if (email === null || email === "" || email.trim() === "") {
      this.toastr.error('Invalid email input!', "Error!")
      return false;
    }

    return true;
  }

  register(f: NgForm) {
    const username = f.value.username;
    const password = f.value.password;
    const confirmPassword = f.value.confirmPassword;
    const email = f.value.email;

    if (this.validateForm(username, password, confirmPassword, email)) {
      this.authService.register({ username, password, email })
        .toPromise().then((data: any) => {
          this.toastr.success('Registration successfull!', 'Success!');
          this.router.navigate(['auth/login']);
        }).catch((err) => this.toastr.error(err.error.error, 'Error!'));
    }
  }
}