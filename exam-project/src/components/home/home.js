import React, { Component } from 'react';
import requester from '../../Infrastructure/remote';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            houses: []
        }
    }

    setHouses = () => {

        requester.get('appdata', 'Houses', 'kinvey')
            .then(houses => {

                let counter = 1;

                houses.forEach(houses => {
                    houses.key = counter.toString();
                    counter++;
                });

                this.setState({
                    houses
                });

            })
            .catch(err => console.log(err));
    }

    render() {

        if (localStorage.getItem('username')) {
            this.setHouses();
            let role = localStorage.getItem('admin') === 'true'
                ? "Admin"
                : "User";

            return (

                <main className="mt-3 mb-5">
                    <br />
                    <div className="jumbotron title">

                        <div className="crd-body container-fluid text-center">
                            <br />
                            <h2 className="card-title">Greetings, {role} [ {localStorage.getItem('username')} ] !</h2>
                            <h4 className="card-text">Feel free to view and order any of my products.</h4>
                            <br />
                        </div>
                        <hr className="hr-2 bg-dark" />
                    </div>

                    <br />

                    <div className="jumbotron container-fluid product-holder">
                    
                        <div className="row d-flex justify-content-around mt-3">

                            {this.state.houses.map(h => {

                                let classSold = "";
                                let avaliable = "Avaliable";

                                if (h.Sold === "true") {
                                    classSold = "classSold";
                                    avaliable = "Sold";
                                }

                                return <a key={h.key} href={"/house/details/" + h._id} className="col-md-3">
                                    <div className={classSold + " product p-1 chushka-bg-color rounded-top rounded-bottom content"}>

                                        <h5 className="text-center mt-3 houseData">{h.key}</h5>
                                        <h5 className="text-center mt-3 houseData">{avaliable}</h5>
                                        <hr className="hr-1 bg-white houseLine" />
                                        <h5 className="text-center mt-3 houseData">{h.Location}</h5>
                                        <hr className="hr-1 bg-white houseLine" />
                                        <img className="animated bounce infinite imgAnimate" src={h.Image.toString()} alt="No House Img" />
                                        <br />
                                        <hr className="hr-1 bg-white houseLine" />
                                        <p className="text-white text-center houseData">
                                            {h.Description.toString().slice(0, Math.min(h.Description.toString().length, 25)) + " . . ."}
                                        </p>
                                        <hr className="hr-1 bg-white houseLine" />
                                        <h6 className="text-center text-white mb-3 houseData">${h.Price}</h6>
                                        <h6 className="text-center text-white mb-3 houseData">{h.Size + " Meters"}</h6>
                                    </div>
                                </a>
                            })}

                        </div>

                    </div>

                </main>
            )
        }

        return (
            <div>
                <br />
                <br />
                <div className="card text-white mb-6 bg-dark title" >
                    <div className="card-header">Introduction</div>
                    <div className="card-body">
                        <h2 className="card-title">Welcome to my Universal House Shop Website</h2>
                        <p className="card-text">The best house prices in the best locations on earth.</p>
                    </div>
                </div>

                <div className="jumbotron text-white mt-3 bg-dark detailsActions">
                    <br />
                    <h3 className="text-white">[ This is a portfolio website for training purposes only. ]</h3>
                    <br />
                    <hr className="bg-white" />
                    <br />
                    <h3 className="text-white"><a className="nav-link-dark homeLink" href="user/register">Register</a> if you don't have an account.</h3>
                    <br />
                    <h3 className="text-white"><a className="nav-link-dark homeLink" href="user/login">Login</a> if you have an account.</h3>
                </div>
                <br />
            </div>
        )
    }
}