import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { RequesterService } from "../../app.requester";

const appKey: string = "kid_rkTx5Dqrm";
const appSecret: string = "4242e34801db43bdb6dd91adeb4d1a02";

@Injectable()
export class UserService {

    constructor(private http: HttpClient,
        private requester: RequesterService) { }

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

    public getAllUsers() {
        return this.requester.get('user', '', 'kinvey');
    }

    public getUserById(id: string) {
        return this.requester.get('user', id, 'kinvey');
    }

    public deleteUserById(id: string) {
        return this.requester.remove('user', id, 'kinvey');
    }
}

