import React, { Component } from 'react'
import requester from '../../Infrastructure/remote'

import observer from '../../Infrastructure/observer';

import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            message: ''
        }
    }

    handleChange = (ev) => {

        let fieldName = ev.target.name;
        let fieldValue = ev.target.value;

        this.setState({
            [fieldName]: fieldValue
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();




        requester.post('user', 'login', 'basic', this.state)
            .then(res => {
                sessionStorage.setItem('authtoken', res._kmd.authtoken);

                localStorage.setItem('username', res.username);

                if (res._kmd.roles) {
                    localStorage.setItem('admin', 'true');
                } else {
                    localStorage.setItem('admin', 'false');
                }

                observer.trigger(observer.events.loginUser, res.username);

                observer.trigger(observer.events.notification, { success: true, message: "LoggedIn Successfully!", type: 'success' })



                this.setState({
                    message: "LoggedIn Successfully!"
                });

                this.props.history.push('/home')
            })
            .catch(res => {

                observer.trigger(observer.events.notification, { error: true, message: "Invalid User Credentials!", type: 'error' })

                this.setState({
                    message: "Invalid User Credentials!"
                });

            });
    }



    render() {

        if (localStorage.getItem('username')) {
            return <Redirect to='/' />
        }

        return (

            <div>
                <br />
                <br />

                <main className="mt-3 forms">
                    <h1 className="text-center">Login</h1>
                    <hr className="bg-secondary half-width" />
                    <form className="mx-auto half-width" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" onChange={this.handleChange} className="form-control" id="username" placeholder="Username..." name="username" />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={this.handleChange} className="form-control" id="password" placeholder="Password..." name="password" />
                        </div>
                        <div className="button-holder d-flex justify-content-center">
                            <input type="submit" className="btn btn-success" value="Login" />
                        </div>
                    </form>
                </main>
                <br />
                <h1 className="text-center danger">{this.state.message}</h1>
                <br />
                <br />

            </div>

        )
    }
}
