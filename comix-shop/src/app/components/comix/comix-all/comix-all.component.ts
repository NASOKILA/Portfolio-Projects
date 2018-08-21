import { Component, OnInit } from '@angular/core';
import { ComixService } from '../comix.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { OrderService } from '../../order/order.service';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-comix-all',
  templateUrl: './comix-all.component.html',
  styleUrls: ['./comix-all.component.css']
})
export class ComixAllComponent implements OnInit {


  public comixes: any[];
  public currentUser: UserModel;
  public currentUserOrders: any[];

  public currentPage: number = 1;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private orderService: OrderService,
    private comixService: ComixService) { }

  ngOnInit() {

    //get all comixes
    this.comixService.getAllComixes()
      .then((comixes: any) => {

        //get currentUser
        this.userService.getAllUsers()
          .then(users => {

            this.currentUser = users.filter(u =>
              u.username === this.authService.username &&
              u.email === this.authService.email)[0];

            //get the orders of that user
            this.orderService.getAllOrders()
              .then(orders => {

                this.currentUserOrders =
                  orders.filter(o => o.buyer === this.currentUser.username);

                comixes.forEach(comix => {
                  comix.description = comix.description
                    .substring(0, Math.min(35, comix.description.length)) + " . . .";

                  //if there is an order which holds this comix._id append an owned roperty to it
                  if (this.currentUserOrders.some(o => o.comix === comix.name)) {
                    comix.owned = true;
                  }

                });
              });

            this.comixes = comixes;
          })
      })
      .catch(err => console.log(err));
  }

  changePage(page) {
    this.currentPage = page;
  }

}