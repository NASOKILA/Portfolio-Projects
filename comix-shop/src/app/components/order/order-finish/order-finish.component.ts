import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../order.service';
import { ComixService } from '../../comix/comix.service';
import { ActivatedRoute } from '@angular/router';
import { ComixEditModel } from '../../../models/comix-edit.model';
import { AuthService } from '../../auth/auth.service';
import { OrderModel } from '../../../models/order.model';
import { OrderCreateModel } from '../../../models/order-create.model';

@Component({
  selector: 'app-order-finish',
  templateUrl: './order-finish.component.html',
  styleUrls: ['./order-finish.component.css']
})
export class OrderFinishComponent implements OnInit {


  public orderId: string;
  public comixId: string;
  public buyerId: string;
  constructor(
    private authService: AuthService,
    private comixService: ComixService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    let id = this.route.snapshot.params["id"];

    //get comix
    this.orderService.getOrderById(id)
      .then((selectedOrder: any) => {

        this.comixService.getAllComixes()
          .then((comixes: any) => {

            let selectedComix = comixes.filter(com => com.name === selectedOrder.comix)[0];
            this.orderId = selectedOrder._id;
            this.buyerId = selectedOrder._acl.creator;
            this.comixId = selectedComix._id;

          }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"));

      })
  }
}