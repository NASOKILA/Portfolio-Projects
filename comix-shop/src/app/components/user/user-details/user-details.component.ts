import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../order/order.service';
import { AuthService } from '../../auth/auth.service';
import { OrderModel } from '../../../models/order.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user: UserModel;
  public userOrders: OrderModel;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    let id = this.route.snapshot.params["id"];

    this.userService.getUserById(id)
      .then(user => {

        if (user._kmd.hasOwnProperty('roles')) {
          user.role = "Admin";
        }
        else {
          user.role = "User";
        }

        this.user = user;

        //get orders for this user
        this.orderService.getAllOrders()
          .then((orders: any) => {

            this.userOrders = orders.filter(o => o._acl.creator === user._id);

          }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"))

      }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"))
  }

}
