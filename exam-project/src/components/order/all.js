import React, { Component } from 'react'
import requester from '../../Infrastructure/remote';

export default class All extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: null,
            users: null
        }
    }



    componentDidMount = () => {

        requester.get('appdata', 'Orders', 'kinvey')
            .then(orders => {

                requester.get('user', '', 'kinvey')
                    .then(users => {

                        this.setState({
                            orders,
                            users
                        });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render() {

        let counter = 0;

        if (this.state.orders === null || this.state.users === null) {
            return null;
        }

        if (this.state.orders.length < 1) {
            return (

                <main className="mt-3 mb-5">

                <div className="jumbotron detailsDataFromLeft">
                    <h1 className="text-center">All Orders</h1>
                    <hr className="hr-2 bg-dark" />
                </div>
                <div className="jumbotron detailsData">
                    <table className="table table-hover houseData">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">#</th>
                                <th scope="col">Order Id</th>
                                <th scope="col">House Id</th>
                                <th scope="col">Customer</th>
                                <th scope="col">House Location</th>
                                <th scope="col">Ordered On</th>
                            </tr>
                        </thead>
                        <tbody>
                            <h3 className="text-center">No orders in DB.</h3>
                        </tbody>
                    </table>
                    </div>
                </main>)
        }

        return (

            <main className="mt-3 mb-5">

                <div className="jumbotron detailsDataFromLeft">
                    <h1 className="text-center">All Orders</h1>
                    <hr className="hr-2 bg-dark" />
                </div>
                <div className="jumbotron detailsData">
                <table className="table table-hover houseData">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">#</th>
                            <th scope="col">Order Id</th>
                            <th scope="col">House Id</th>
                            <th scope="col">Customer</th>
                            <th scope="col">House Location</th>
                            <th scope="col">Ordered On</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.orders.map(o => {

                            return <tr className="table-success housebuttons" key={counter}>
                                <th scope="row">{++counter}</th>
                                <td><a className="TableOrderId" href={'/order/details/' + o._id}>{o._id}</a></td>
                                <td><a className="TableOrderId" href={'/house/details/' + o.Product._id}>{o.Product._id}</a></td>
                                <td><a className="TableOrderId" href={'/user/profile/' + this.state.users.filter(u => u.username === o.Customer)[0]._id}>{o.Customer}</a></td>
                                <td>{o.Product.Location}</td>
                                <td>{o.OrderedOn}</td>
                            </tr>
                        })}

                    </tbody>
                </table>
                </div>
            </main>
        )

    }
}