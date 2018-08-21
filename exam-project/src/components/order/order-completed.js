import React, { Component } from 'react'
import requester from '../../Infrastructure/remote';


export default class OrderCompleted extends Component {

    constructor(props) {
        super(props);

        this.state = {
            order: null,
            message: '',
            error: false
        }
    }

    componentDidMount = () => this.sethouseState();

    sethouseState = () => {
        let id = this.props.match.params.id;


        requester.get('appdata', 'Houses/' + id, 'kinvey')
            .then(house => {

                requester.update('appdata', 'Houses/' + house._id, 'kinvey', {
                    'Location': house.Location,
                    'Size': house.Size,
                    'Price': house.Price,
                    'Image': house.Image,
                    'Description': house.Description,
                    'Sold': 'true'
                })
                    .then(updatedHouse => {


                        requester.get("appdata", "Orders", "kinvey")
                            .then((orders) => {

                                let orderExists = false;

                                if (orders.some(o => o.Product.Location === house.Location
                                    && o.Product.Description === house.Description
                                    && o.Product.Image === house.Image
                                    && o.Customer === localStorage.getItem("username"))) {
                                    console.log("order exists")
                                    orderExists = true;
                                    


                                    let order = orders.filter(o => o.Product.Location === house.Location
                                        && o.Product.Description === house.Description
                                        && o.Product.Image === house.Image
                                        && o.Customer === localStorage.getItem("username"))[0];
                                    
                                    //get order
                                    this.setState({
                                        message: "Congratulations Order Created Successfully !",
                                        order
                                    })
                                }

                                if (!orderExists) {

                                    console.log("order created!")

                                    requester.post('appdata', 'Orders', 'Basic', {
                                        'OrderedOn': new Date(Date.now()).toLocaleString(),
                                        'Customer': localStorage.getItem("username"),
                                        'Product': updatedHouse,
                                    })
                                        .then(order => {

                                            this.setState({
                                                message: "Congratulations Order Created Successfully !",
                                                order
                                            })

                                        }).catch(err => console.log(err));
                                }

                            }).catch(err => console.log(err));

                    }).catch(err => console.log(err));

            })
            .catch(err => console.log(err));
    }

    render() {

        if (this.state.error) {
            return (

                <div className="jumbotron title">
                    <div className="container-fluid text-center">
                        <h1>{this.state.message}</h1>
                        <br />
                        <h3>You cannot buy it !</h3>
                        <div className="product-action-holder mt-4 d-flex justify-content-around">
                            <a className="btn btn btn-info housebuttons" href={"/"}>Back to home</a>
                        </div>
                    </div>
                </div>
            )
        }

        if (this.state.order !== null) {
            return (
                <div className="container-fluid text-center">
                    <br />
                    <br />
                    <div className="jumbotron title">
                        <h1>{this.state.message}</h1>
                        <hr className="hr-2 bg-dark" />
                        <br />
                        <h2 className="housebuttons">Order Completed on {this.state.order.OrderedOn}.</h2>
                        <br />
                        <h3 className="housebuttons">Enjoy your new house :)</h3>
                        <div className="product-action-holder mt-4 d-flex justify-content-around">
                            <a className="btn btn btn-info housebuttons" href={"/"}>Back to home</a>
                            <a className="btn btn btn-info housebuttons" href={"/order/details/" + this.state.order._id}>Order Details</a>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                </div>
            )
        }
    }
}