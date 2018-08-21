import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import requester from '../../Infrastructure/remote';

export default class Logout extends Component {
    
    logout = () => {
        requester.post('user', '_logout', 'kinvey')
        .then(res => {
        })
        .catch(err => console.log(err));
    }
            
    render = () => {

        this.logout();
        sessionStorage.clear();
        localStorage.clear();
        return <Redirect to='/' />
    }
}
