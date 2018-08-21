import React, { Component } from 'react'
export default class header extends Component {

    render() {


        if (localStorage.getItem('admin') === 'true') {

            return (
                <header>

                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">HouseShop</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor02">
                            <ul className="navbar-nav mr-auto">

                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/">Home</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/about">About</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/user/profile/:id">Profile</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/order/my">My Orders</a>
                                </li>

                                <li className="nav-item" >
                                    <a className="nav-link nav-link-white" href="/order/all">All Orders</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/house/create">Create House</a>
                                </li>

                            </ul>

                            <ul className="navbar-nav left-side">
                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/user/logout">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                </header>)
        }

        if (localStorage.getItem('username')) {
            return (<header>
                
                
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">HouseShop</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor02">
                            <ul className="navbar-nav mr-auto">

                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/">Home</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/about">About</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/user/profile/:id">Profile</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/order/my">My Orders</a>
                                </li>

                            </ul>

                            <ul className="navbar-nav left-side">
                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/user/logout">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </nav>

            </header>)
        }


        return (

            <header className="header">
                 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">HouseShop</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor02">
                            <ul className="navbar-nav mr-auto">

                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/">Home</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/about">About</a>
                                </li>
                            </ul>

                            <ul className="navbar-nav left-side">
                            <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/user/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-link-white" href="/user/register">Register</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
            </header>
        )

    }
}

