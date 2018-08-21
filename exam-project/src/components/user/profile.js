import React, { Component } from 'react';
import requester from '../../Infrastructure/remote';

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            orders: null
        }
    }

    componentDidMount = () => this.getUser()

    getUser = () => {

        let id = this.props.match.params.id;

        if (id.length !== 24) {
            requester.get('user', '', 'kinvey')
                .then(users => {
                    let user = users.filter(u => u.username === localStorage.getItem('username'))[0]

                    requester.get('appdata', 'Orders', 'kinvey')
                        .then(orders => {

                            this.setState({
                                user,
                                orders
                            });

                        })
                        .catch(err => console.log(err));

                })
                .catch(err => console.log(err));
        }
        else {
            requester.get('user', id, 'kinvey')
                .then(user => {

                    requester.get('appdata', 'Orders', 'kinvey')
                        .then(orders => {

                            this.setState({
                                user,
                                orders
                            });

                        })
                        .catch(err => console.log(err));

                })
                .catch(err => console.log(err));
        }
    }


    render() {

        if (this.state.orders === null || this.state.user === null) {
            return null;
        }


        return (

            <main className="mt-3 mb-5">

                <br />
                <div className="card border-secondary mb-3 detailsData">
                
                    <div className="card-header display-4">User Profile Page</div>
                    <br />
                    <div className="card-body">
                        <h4 className="card-title display-5">Secondary card title</h4>
                        <p className="card-text display-6 houseData">{this.state.user.username}</p>
                        <br/>
                            <h4 className="card-title display-5">Email:</h4>
                            <p className="card-text display-6 houseData">{this.state.user.email}</p>
                            <br/>
                            <h4 className="card-title display-5">Houses:</h4>
                            <p className="card-text display-6 houseData">{this.state.orders.filter(o => o.Customer === this.state.user.username).length}</p>
                        <br />
                        <h4 className="card-title display-5">Role:</h4>
                        <div className="product-description-holder">
                            <p className="card-text display-6 houseData">
                                {this.state.user._kmd.roles === undefined ? "User" : "Admin"}
                            </p>
                            <br/>
                        </div>
                    
                </div>



                </div>
            </main>
        )

    }
}