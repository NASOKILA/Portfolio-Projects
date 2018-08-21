import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../../models/order.model';
import { OrderService } from '../order.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-order-my',
  templateUrl: './order-my.component.html',
  styleUrls: ['./order-my.component.css']
})
export class OrderMyComponent implements OnInit {

  orders: OrderModel[];

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.orderService.getAllOrders()
      .then((orders: any) => {

        //get user by id
        this.userService.getAllUsers()
          .then((users) => {
            let currentUser = users.filter(
              u => u.username === this.authService.username
                && u.email === this.authService.email)[0];

            this.orders = orders
              .filter(o => o._acl.creator === currentUser._id);

          }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"))

      }).catch(err => this.toastr.error(err.responseJSON.error, 'Error!'))
  }

  deleteOrder(id: string) {



    this.orderService.deleteOrder(id)
      .then(() => {

        this.orderService.getAllOrders()
          .then((orders: any) => {

            this.userService.getAllUsers()
              .then((users) => {
                let currentUser = users.filter(
                  u => u.username === this.authService.username
                    && u.email === this.authService.email)[0];

                this.orders = orders.filter(o => o._acl.creator === currentUser._id);
                this.toastr.success("Order deleted successfully!", "Success!");

              }).catch(err => this.toastr.error(err.responseJSON.error, 'Error!'))
          }).catch(err => this.toastr.error(err.responseJSON.error, 'Error!'))
      }).catch(err => this.toastr.error(err.responseJSON.error, 'Error!'));
  }

}

