import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { RequesterService } from "../../app.requester";
import { CommentModel } from "../../models/comment.model";
import { CommentCreateModel } from "../../models/comment-create.model";

const appKey: string = "kid_rkTx5Dqrm";
const appSecret: string = "4242e34801db43bdb6dd91adeb4d1a02";

@Injectable()
export class CommentsService {

    constructor(private requester: RequesterService) { }

    private createAuthHeaders(type: string): HttpHeaders {
        if (type === "Basic") {
            return new HttpHeaders({
                "Authorization": `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                "Content-Type": 'application/json'
            })
        } else {
            return new HttpHeaders({
                "Authorization": `Kinvey ${localStorage.getItem("authtoken")}`,
                "Content-Type": "application/json"
            })
        }
    }


    public getAllComments() {
        return this.requester.get('appdata', 'comments', 'kinvey')
    }

    public getCommentById(id: string) {
        return this.requester.get('appdata', 'comments/' + id, 'kinvey')
    }

    public createComment(comment: CommentCreateModel) {
        return this.requester.post('appdata', 'comments', 'kinvey', comment)
    }

    public updateComment(comment: CommentModel) {
        return this.requester.update('appdata', 'comments/' + comment._id, 'kinvey', comment);
    }

    public deleteComment(id: string) {
        return this.requester.remove('appdata', 'comments/' + id, 'kinvey')
    }

}