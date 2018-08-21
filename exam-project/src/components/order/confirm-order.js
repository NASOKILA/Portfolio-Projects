import React, { Component } from 'react'
import requester from '../../Infrastructure/remote';

export default class ConfirmOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            house: null
        }

    }



    componentDidMount = () => this.sethouseState();

    sethouseState = () => {
        let id = this.props.match.params.id;

        requester.get('appdata', 'Houses/' + id, 'kinvey')
            .then(house => {
                this.setState({
                    house
                });
            })
            .catch(err => console.log(err));
    }


    render() {


        if (this.state.house !== null) {

            return (
                <div>
                    <main className="mt-3 mb-5">
                        <br />

                        <div className="jumbotron detailsDataFromLeft">
                            <h1>Confirm Order Page</h1>
                            <hr className="hr-2 bg-dark" />
                        </div>

                        <div className="jumbotron detailsData">
                            <h3 className="text-center">Customer: </h3>
                            <span className="names">{localStorage.getItem("username")}</span>
                            <br /><br />
                            <h3 className="text-center">Location: </h3>
                            <span className="names">{this.state.house.Location}</span>
                            <br /><br />

                            <h3 className="text-center">Price:</h3>
                            <span className="names">{this.state.house.Price} $</span>
                            <br /><br />

                            <h3 className="text-center">Size in square meters: </h3>
                            <span className="names">{this.state.house.Size} s.m.</span>
                            <br /><br />

                            <h3 className="text-center">Image: </h3>
                            <img className="nameImage" src={this.state.house.Image} alt="No Img Avaliable" />
                            <br /><br />

                            <h3 className="text-center">Description:</h3>
                            <span className="names">{this.state.house.Description}</span>
                            <br /><br />
                        </div>


                        <div className="jumbotron detailsActions">
                            <h3 className="text-center">Actions</h3>
                            <hr className="hr-2 bg-dark" />
                            <div className="product-action-holder mt-4 d-flex justify-content-around">

                                <a className="btn btn-lg btn-success housebuttons" href={"/order/completed/" + this.state.house._id}>Buy</a>
                                <a className="btn btn-lg btn-info housebuttons" href={"/house/details/" + this.state.house._id}>Back</a>
                            </div>
                        </div>
                    </main>
                    <br />
                    <br />
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

