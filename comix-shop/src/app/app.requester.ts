
import { Injectable } from "@angular/core";

import $ from 'jquery';

const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_rkTx5Dqrm'; // APP KEY HERE
const APP_SECRET = '4242e34801db43bdb6dd91adeb4d1a02'; // APP SECRET HERE

@Injectable()
export class RequesterService {

    constructor() { }

    public makeAuth(auth) {
        if (auth === 'basic') {
            return `Basic ${btoa(APP_KEY + ":" + APP_SECRET)}`;
        } else {
            return `Kinvey ${localStorage.getItem('authtoken')}`
        }
    }

    public makeRequest(method, module, endpoint, auth) {

        return {

            url: BASE_URL + module + '/' + APP_KEY + '/' + endpoint,
            method: method,
            headers: {
                'Authorization': this.makeAuth(auth)
            }
        }
    }

    //get
    public get(module, endpoint, auth) {
        return $.ajax(this.makeRequest('GET', module, endpoint, auth));
    }

    //post
    public post(module, endpoint, auth, data) {
        let obj: any = this.makeRequest('POST', module, endpoint, auth);
        if (data) {
            obj.data = data;
        }
        return $.ajax(obj);
    }

    //put
    public update(module, endpoint, auth, data) {
        let obj: any = this.makeRequest('PUT', module, endpoint, auth);
        obj.data = data;
        return $.ajax(obj);
    }

    //delete
    public remove(module, endpoint, auth) {
        return $.ajax(this.makeRequest('DELETE', module, endpoint, auth));
    }

}