import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { OrderModel } from '../../../models/order.model';
import { UserService } from '../user.service';
import { OrderService } from '../../order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  myOrders: OrderModel[]
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private orderService: OrderService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    //get orders for this user
    this.orderService.getAllOrders()
      .then((orders: any) => {

        this.userService.getAllUsers()
          .then((users) => {
            let currentUser = users.filter(
              u => u.username === this.authService.username
                && u.email === this.authService.email)[0];

            this.myOrders = orders
              .filter(o => o._acl.creator === currentUser._id);

          }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"))

      }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"))
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id)
      .then(() => {
        this.orderService.getAllOrders()
          .then((orders: OrderModel[]) => {

            this.myOrders = orders;
            this.toastr.success("Order deleted successfully!", "Success!");
          }).catch(err => this.toastr.error(err.responseJSON.error, 'Error!'))
      }).catch(err => this.toastr.error(err.responseJSON.error, 'Error!'))
  }

}
