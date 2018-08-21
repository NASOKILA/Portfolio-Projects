import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../../models/order.model';
import { OrderService } from '../order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-all',
  templateUrl: './order-all.component.html',
  styleUrls: ['./order-all.component.css']
})
export class OrderAllComponent implements OnInit {

  orders: OrderModel[];

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.orderService.getAllOrders()
      .then((orders: OrderModel[]) => {
        this.orders = orders;
      }).catch(err => this.toastr.error(err.responseJSON.error, 'Error!'))
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id)
      .then(() => {
        this.orderService.getAllOrders()
          .then((orders: OrderModel[]) => {

            this.orders = orders;
            this.toastr.success("Order deleted successfully!", "Success!");
          }).catch(err => this.toastr.error(err.responseJSON.error, 'Error!'))
      }).catch(err => this.toastr.error(err.responseJSON.error, 'Error!'))
  }
}
