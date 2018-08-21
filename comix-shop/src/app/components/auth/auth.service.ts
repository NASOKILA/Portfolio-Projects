
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { LoginModel } from "../../models/login.model";
import { RegisterModel } from "../../models/register.model";


const appKey: string = "kid_rkTx5Dqrm";
const appSecret: string = "4242e34801db43bdb6dd91adeb4d1a02";
const registerUrl: string = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl: string = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl: string = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthService {

    private currentAuthtoken: string = localStorage.getItem('authtoken')
        ? localStorage.getItem('authtoken')
        : null;

    private currentUsername: string = localStorage.getItem('username')
        ? localStorage.getItem('username')
        : null;

    private currentEmail: string = localStorage.getItem('email')
        ? localStorage.getItem('email')
        : null;

    private currentRole: string = localStorage.getItem('role')
        ? localStorage.getItem('role')
        : null;

    constructor(private http: HttpClient) { }

    //this function creates the authentication, it can be Basic (when we login or register), Kinvey (when we are logged in)
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

    public login(loginModel: LoginModel) {
        return this.http.post(
            loginUrl,
            JSON.stringify(loginModel),
            { headers: this.createAuthHeaders("Basic") }
        );
    }

    public register(registerModel: RegisterModel) {
        return this.http.post(
            registerUrl,
            JSON.stringify(registerModel),
            { headers: this.createAuthHeaders("Basic") }
        );
    }

    public logout() {
        return this.http.post(
            logoutUrl,
            {},
            { headers: this.createAuthHeaders("Kinvey") }
        );
    }

    //getter and setter for the authtoken field
    get authtoken() {
        return this.currentAuthtoken;
    }
    set authtoken(newAuthtoken: string) {
        this.currentAuthtoken = newAuthtoken;
    }

    //getter and setter for the username field
    get username() {
        return this.currentUsername;
    }
    set username(newUsername: string) {
        this.currentUsername = newUsername;
    }

    //getter and setter for the email field
    get email() {
        return this.currentEmail;
    }
    set email(newEmail: string) {
        this.currentEmail = newEmail;
    }

    //getter and setter for the role field
    get role() {
        return this.currentRole;
    }
    set role(newRole: string) {
        this.currentRole = newRole;
    }

    //Guard:
    isAuthenticated() {

        if (localStorage.getItem('authtoken') == null)
            return false;

        return this.currentAuthtoken === localStorage.getItem('authtoken');
    }

    isAdmin() {
        return this.role == "Admin"
            ? true : false;
    }
}