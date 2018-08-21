import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ComixEditModel } from '../../../models/comix-edit.model';
import { ComixService } from '../../comix/comix.service';
import { CommentModel } from '../../../models/comment.model';
import { CommentsService } from '../../comix/comments.service';
import { AuthService } from '../../auth/auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {

  public comix: ComixEditModel;
  public comments: CommentModel[] = [];
  public commentDescription: string = "";

  constructor(
    private comixService: ComixService,
    private authService: AuthService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router,
    private commentService: CommentsService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    let id = this.route.snapshot.params["id"];

    this.comixService.getComixById(id)
      .then((comix: ComixEditModel) => {
        this.comix = comix;

        let commentsIdsArray: string[] = [];

        if (this.comix.comments !== undefined) {
          commentsIdsArray = comix.comments.toString().split(",");
        }

        this.commentService.getAllComments()
          .then((commentsArr: CommentModel[]) => {

            this.comments = commentsArr.filter(c => commentsIdsArray.includes(c._id));

          });

      });
  }

  createOrder() {
    let comix = this.comix.name;
    let date = new Date().toLocaleDateString('en-US');
    let buyer: string = this.authService.username;
    let price = this.comix.price.toString();

    this.orderService.createOrder({ comix, date, buyer, price })
      .then((order: any) => {

        //update comix stock
        let previousStock: number = this.comix.stock;
        this.comix.stock = previousStock - 1;
        this.comixService.updateComix(this.comix)
          .then(c => {

            this.toastr.success("Order created successfully!", "Success!")
            this.router.navigate(['/order/finish/' + order._id]);
          }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"));

      }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"));
  }
}
