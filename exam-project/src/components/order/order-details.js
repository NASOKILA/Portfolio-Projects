import React, { Component } from 'react'
import requester from '../../Infrastructure/remote';

export default class OrderDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            order: null
        }
    }


    deleteOrder = () => {
        let id = this.props.match.params.id;
        
        requester.remove('appdata', 'Orders/' + id, 'kinvey')
            .then(() => {
                console.log("Order deleted !");

                this.props.history.push('/home')
                
            })
            .catch(err => console.log(err));
    }


    componentDidMount = () => this.sethouseState();

    sethouseState = () => {
        let id = this.props.match.params.id;

        requester.get('appdata', 'Orders/' + id, 'kinvey')
            .then(order => {
                this.setState({
                    order
                });
            })
            .catch(err => console.log(err));
    }

    render() {

        if (this.state.order !== null) {

            return (
                <div>
                    <main className="mt-3 mb-5">
                        <br />
                        <div className="jumbotron detailsData">
                            <h1>Order Details Page</h1>
                            <br />

                            <hr className="hr-2 bg-dark" />
                            <h3 className="text-center">Customer: </h3>
                            <span className="names">{this.state.order.Customer}</span>
                            <br />
                            <br />

                            <h3 className="text-center">Ordered On: </h3>
                            <span className="names">{this.state.order.OrderedOn}</span>
                            <br />
                            <hr className="hr-2 bg-dark" />
                            <h3 className="text-center">House Location: </h3>
                            <span className="names">{this.state.order.Product.Location}</span>
                            <br />
                            <br />

                            <h3 className="text-center">Price:</h3>
                            <span className="names">{this.state.order.Product.Price} $</span>
                            <br />
                            <br />

                            <h3 className="text-center">Size: </h3>
                            <span className="names">{this.state.order.Product.Size} s.m.</span>
                            <br />
                            <br />

                            <h3 className="text-center">Description:</h3>
                            <span className="names">{this.state.order.Product.Description}</span>
                            <br />
                            <br />

                            <div className="jumbotron detailsActions">
                                <h3 className="text-center">Actions</h3>
                                <hr className="hr-2 bg-dark" />
                                <div className="product-action-holder mt-4 d-flex justify-content-around">
                                    <a className="btn btn-lg btn-info housebuttons" href="/">Back to home</a>
                                    <button className="btn btn-danger housebuttons" onClick={this.deleteOrder}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </main>
                    <br />
                    <br />
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }
}

