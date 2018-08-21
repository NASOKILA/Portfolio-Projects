import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css']
})
export class UserAllComponent implements OnInit {

  users: UserModel[];

  constructor(
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.userService.getAllUsers()
      .then((users) => {

        users.forEach(user => {
          if (user._kmd.hasOwnProperty('roles')) {
            user.role = "Admin";
          }
          else {
            user.role = "User";
          }
        });

        this.users = users;
      })
      .catch(err => this.toastr.error(err.responseJSON.error, 'Error!'));
  }
}
