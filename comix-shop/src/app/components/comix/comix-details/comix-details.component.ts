import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ComixService } from '../comix.service';
import { ComixEditModel } from '../../../models/comix-edit.model';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentModel } from '../../../models/comment.model';
import { $ } from 'protractor';
import { CommentsService } from '../comments.service';
import { CommentCreateModel } from '../../../models/comment-create.model';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';


@Component({
  selector: 'app-comix-details',
  templateUrl: './comix-details.component.html',
  styleUrls: ['./comix-details.component.css']
})
export class ComixDetailsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private comixService: ComixService,
    private commentService: CommentsService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  public comix: ComixEditModel;
  public comments: CommentModel[] = [];
  public commentDescription: string = "";
  public id: string;

  ngOnInit() {

    this.id = this.route.snapshot.params["id"];

    this.comixService.getComixById(this.id)
      .then((comix: ComixEditModel) => {
        this.comix = comix;

        //get comments
        let commentsIdsArray: string[] = [];

        if (comix.comments !== undefined) {
          commentsIdsArray = comix.comments.toString().split(",");
        }

        this.commentService.getAllComments()
          .then((commentsArr: CommentModel[]) => {
            this.comments = commentsArr.filter(c => commentsIdsArray.includes(c._id));
          });
      });
  }

  postComment() {

    //create comment object
    let date = new Date().toLocaleDateString('en-US');
    let comixId = this.id;
    let description = this.commentDescription;
    let creator = this.authService.username;

    //create comment first
    this.commentService.createComment(new CommentCreateModel(date, comixId, description, creator))
      .then((comment: CommentModel) => {

        //add comment to comix by updating it
        if (this.comix.comments === undefined) {
          this.comix.comments = [];
        }

        this.comix.comments.push(comment._id);
        this.comixService.updateComix(this.comix)
          .then(() => {

            //add comment to comments by updating it
            this.comments.push(comment);
            this.toastr.success("Comment created successfully!", "Success!")

            this.commentDescription = "";
          });
      })
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id)
      .then(() => {
        this.commentService.getAllComments()
          .then((commentsArr: CommentModel[]) => {
            this.toastr.success("Comment removed successfully!", "Success!");

            let commentsIdsArray: string[] = [];

            if (this.comix.comments !== undefined) {
              commentsIdsArray = this.comix.comments.toString().split(",");
            }

            this.comments = commentsArr.filter(c => commentsIdsArray.includes(c._id));
          });

      })
  }

}