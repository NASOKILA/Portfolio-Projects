import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { RequesterService } from "../../app.requester";
import { ComixEditModel } from "../../models/comix-edit.model";

const appKey: string = "kid_rkTx5Dqrm";
const appSecret: string = "4242e34801db43bdb6dd91adeb4d1a02";

@Injectable()
export class OrderService {

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

    public getAllOrders() {
        return this.requester.get('appdata', 'orders', 'kinvey')
    }

    public getOrderById(id: string) {
        return this.requester.get('appdata', 'orders/' + id, 'kinvey')
    }

    public createOrder(comix: any) {
        return this.requester.post('appdata', 'orders', 'kinvey', comix)
    }

    public updateOrder(comix: ComixEditModel) {
        return this.requester.update('appdata', 'orders/' + comix._id, 'kinvey', comix)
    }

    public deleteOrder(id: string) {
        return this.requester.remove('appdata', 'orders/' + id, 'kinvey')
    }
}