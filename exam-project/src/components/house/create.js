import React, { Component } from 'react'
import requester from '../../Infrastructure/remote';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Location: null,
            Price: null,
            Size: null,
            Image: null,
            Description: null,
            message: ''
        }
    }

    handleChange = (ev) => {

        let key = ev.target.name;
        let value = ev.target.value;

        this.setState({
            [key]: value
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();

        if (this.state.Location === null || this.state.Location.trim() === ""){
            this.setState({
                message: "Location cannot be null or empry string !"
            })
        }
        else if(this.state.Price === null || this.state.Price.trim() === ""){
            this.setState({
                message: "Price cannot be null or empry string !"
            })
        }
        else if(Number(this.state.Price) < 0){
            this.setState({
                message: "Price cannot be a number less than 0 !"
            })
        }
        else if(this.state.Size === null || this.state.Size.trim() === "") {
            this.setState({
                message: "Size cannot be null or empry string !"
            })
        }
        else if(Number(this.state.Size) < 0){
            this.setState({
                message: "Size cannot be a number less than 0 !"
            })
        }
        else if(this.state.Description === null || this.state.Description.trim() === ""){
            this.setState({
                message: "Description cannot be null or empry string !"
            })
        }
        else {
            requester.post('appdata', 'Houses', 'Basic', {
                'Location': this.state.Location,
                'Size': this.state.Size,
                'Price': this.state.Price,
                'Image': this.state.Image,
                'Description': this.state.Description,
                'Sold': false
            })
                .then(res => {

                    this.setState({
                        message: "House Created Successfully !"
                    })

                    this.props.history.push('/home')
                }).catch(err => {
                    console.log(err)
                    this.setState({
                        message: "Something Went Wrong !"
                    })
                });
        }
    }

    render() {

        return (
            <div>
                <br/>
                <br/>
                <main className="mt-3">
                    <h1 className="text-center">Create House</h1>
                    <hr className="bg-secondary half-width" />

                    <form className="mx-auto half-width" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Location</label>
                            <input type="text" onChange={this.handleChange} className="form-control" id="name" placeholder="Location..." name="Location" />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="number" onChange={this.handleChange} className="form-control" id="price" placeholder="Price..." name="Price" />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="description">Size</label>
                            <input type="text" onChange={this.handleChange} className="form-control" id="size" placeholder="Size meters..." name="Size" />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="description">Image</label>
                            <input type="text" onChange={this.handleChange} className="form-control" id="image" placeholder="Image..." name="Image" />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea rows="4" cols="50" type="text" onChange={this.handleChange} className="form-control" id="description" placeholder="Description..." name="Description"></textarea>
                        </div>
                        <br/>
                        <hr className="bg-secondary half-width" />

                        <div className="button-holder d-flex justify-content-center">
                            <input type="submit" value="Create" className="btn btn-success" />
                        </div>
                    </form>
                </main>
                <br />
                <h1 className="text-center danger">{this.state.message}</h1>
                <br/>
                <br/>
            </div>

        )
    }
}
