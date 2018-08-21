import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { RequesterService } from "../../app.requester";
import { ComixEditModel } from "../../models/comix-edit.model";
import { ComixCreateModel } from "../../models/comix-create.model";

const appKey: string = "kid_rkTx5Dqrm";
const appSecret: string = "4242e34801db43bdb6dd91adeb4d1a02";

@Injectable()
export class ComixService {

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

    public getAllComixes() {
        return this.requester.get('appdata', 'comix', 'kinvey')
    }

    public getComixById(id: string) {
        return this.requester.get('appdata', 'comix/' + id, 'kinvey')
    }

    public createComix(comix: ComixCreateModel) {
        return this.requester.post('appdata', 'comix', 'kinvey', comix)
    }

    public updateComix(comix: ComixEditModel) {
        return this.requester.update('appdata', 'comix/' + comix._id, 'kinvey', comix)
    }

    public deleteComix(id: string) {
        return this.requester.remove('appdata', 'comix/' + id, 'kinvey')
    }
}