
import React, { Component } from 'react'

import requester from '../../Infrastructure/remote';

import observer from '../../Infrastructure/observer';

import { Redirect } from 'react-router-dom';

export default class Register extends Component {


    constructor(props) {
        super(props);

        this.state = {
            username: null,
            email: null,
            password: null,
            repeatPassword: null,
            message:''
        }
    }

    handleChange = (ev) => {
            
        let key = ev.target.name;
        let value = ev.target.value;
        
        this.setState({
            [key]:value
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        
        if(this.state.username === null || this.state.username.trim() === ""){
            this.setState({
                message : "Username must not be null or empty!"
            })
        }
        else if(this.state.username.length < 3)
        {
            this.setState({
                message: "Username length must not be less than 3 symbols!"
            })
        }
        else if(this.state.email === null || this.state.email.trim() === ""){
            this.setState({
                message : "Email must not be null or empty!"
            })
        }
        else if(this.state.email.length < 5)
        {
            this.setState({
                message: "Email length must not be less than 5 symbols!"
            })
        }
        else if(this.state.password !== this.state.repeatPassword){
            this.setState({
                message : "Passwords must match!"
            })
        }
        else if(this.state.password === null || this.state.password.trim() === ""){
            this.setState({
                message : "Password must not be null or empty!"
            })
        }
        else if(this.state.repeatPassword === null || this.state.repeatPassword.trim() === ""){
            this.setState({
                message : "Repeat Password must not be null or empty!"
            })
        }
        else if(this.state.password.length < 8){
            this.setState({
                message : "Password length must not be less than 8 symbols!"
            })
        }
        else if(this.state.repeatPassword.length < 8){
            this.setState({
                message : "Repeat Password length must not be less than 8 symbols!"
            })
        }
        else {

            requester.post('user', '', 'basic', {'username' : this.state.username, 'password' : this.state.password, 'email': this.state.email})
            .then(res => {
                observer.trigger(observer.events.notification, {success: true, message: "Register Successfully Please Login!", type: 'success'})    
            
                this.setState({
                    message: "Registration Successfully!"
                })

                requester.post('user', 'login', 'basic', this.state)
                .then(res => {
                    sessionStorage.setItem('authtoken', res._kmd.authtoken);
                    localStorage.setItem('username', res.username);
                    observer.trigger(observer.events.loginUser, res.username);    
                    observer.trigger(observer.events.notification, {success: true, message: "LoggedIn Successfully!", type: 'success'})
                    
                    if(res._kmd.roles){
                        localStorage.setItem('admin', 'true');
                    }else{
                        localStorage.setItem('admin', 'false');
                    }
                
                    this.props.history.push('/home')
                })
                .catch(res => observer.trigger(observer.events.notification, {error: true, message: "Invalid User Credentials!", type: 'error'}));        
    

            }).catch(err => {
                console.log(err)
                observer.trigger(observer.events.notification, {error: true, message: err.responseJSON.description, type: 'error'})                    
                this.setState({
                    message: "Invalid Input Fields !"
                })
            });
        }
    }



    render() {
    

        if(localStorage.getItem('username'))
        {
            return <Redirect to='/' />
        }

        return (

            <main className="mt-3 forms">
            <br/>
            <br/>
            <h1 className="text-center">Register</h1>
            <hr className="bg-secondary half-width"/>

            <form className="mx-auto half-width" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" onChange={this.handleChange} className="form-control" id="username" placeholder="Username..." name="username"/>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={this.handleChange} className="form-control" id="email" placeholder="Email..." name="email"/>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={this.handleChange} className="form-control" id="password" placeholder="Password..." name="password"/>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" onChange={this.handleChange} className="form-control" id="confirmPassword" placeholder="Confirm Password..." name="repeatPassword"/>
                </div>
                <br/>
                <div className="button-holder d-flex justify-content-center">
                    <input type="submit" className="btn btn-success" value="Register"/>
                </div>
            </form>
            <br/>
            <h1 className="text-center danger">{this.state.message}</h1>
            <br/>
            <br/>
        
        </main>
    
            



            )
    }
}
