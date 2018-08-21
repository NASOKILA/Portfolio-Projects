import React, { Component } from 'react'
import requester from '../../Infrastructure/remote';


export default class Delete extends Component {

    constructor(props){
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


    componentDidMount = () => this.sethouseState();

    sethouseState = () => {
        let id = this.props.match.params.id;

        requester.get('appdata', 'Houses/' + id, 'kinvey')
            .then(house => {
                this.setState({
                    Location: house.Location,
                    Price: house.Price,
                    Size: house.Size,
                    Image: house.Image,
                    Description: house.Description
                });
            })
            .catch(err => console.log(err));
    }

    handleChange = (ev) => {
            
        let key = ev.target.name;
        let value = ev.target.value;    
        
        this.setState({
            [key]:value
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();

           
            let id = this.props.match.params.id;
            
            requester.remove('appdata', 'Houses/' + id, 'Basic')
            .then(res => {
                
                this.setState({
                    message: "House Deleted Successfully !"
                })

                this.props.history.push('/home');

            }).catch(err => {
                console.log(err)
                this.setState({
                    message: "Something Went Wrong !"
                })
            });
        
    }

    render() {
        
        if(this.state.Location !== null){

            return (<div>
                <br/>
                <br/>

                <main className="mt-3 forms">
                    <h1 className="text-center">Delete House</h1>
                    <hr className="bg-secondary half-width" />
                    <form className="mx-auto half-width" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Location</label>
                            <input type="text" disabled onChange={this.handleChange} value={this.state.Location} className="form-control dangerInput" id="name"  placeholder="Location..." name="Location" />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="number" disabled onChange={this.handleChange} value={this.state.Price} className="form-control dangerInput" id="price" placeholder="Price..." name="Price" />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="description">Size</label>
                            <input type="text" disabled onChange={this.handleChange} value={this.state.Size} className="form-control dangerInput" id="size" placeholder="Size meters..." name="Size" />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="description">Image</label>
                            <input type="text" disabled onChange={this.handleChange} value={this.state.Image} className="form-control dangerInput" id="image" placeholder="Image..." name="Image" />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea rows="4" cols="50" type="text" disabled value={this.state.Description} onChange={this.handleChange} className="form-control dangerInput" id="description" placeholder="Description..." name="Description"></textarea>
                        </div>
                        <br/>
                        <hr className="bg-secondary half-width" />

                        <div className="button-holder d-flex justify-content-center">
                            <input type="submit" value="Delete" className="btn btn-danger"/>
                        </div>
                    </form>
                </main>
                <br/>
                <h1 className="text-center danger">{this.state.message}</h1>
                <br/>
                <br/>
            </div>)
        }

        return (
            <div>
            </div>
            )
        
    }
}
