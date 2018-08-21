import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderModel } from '../../../models/order.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public order: OrderModel;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    let id = this.route.snapshot.params["id"];

    this.orderService.getOrderById(id)
      .then((order: any) => {
        this.order = order;
      }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"))
  }
}