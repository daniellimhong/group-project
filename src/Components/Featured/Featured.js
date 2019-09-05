import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Featured.scss";

export default class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allListings: [],
      year: undefined,
      make: undefined,
      model: undefined,
      trim: undefined,
      listingId: 0,
      photos: []
    };
  }

  async componentDidMount() {
    const allListings = await axios
      .get("/listings/get_all_listings")
      .then(res => {
        return res.data;
      });
    this.setState({
      allListings: allListings
    });
    this.getRandomListing();
  }

  getRandomListing() {
    const randomIndex = Math.floor(
      Math.random() * this.state.allListings.length
    );
    const year = this.state.allListings[randomIndex].car.year;
    const make = this.state.allListings[randomIndex].car.make;
    const model = this.state.allListings[randomIndex].car.model;
    const trim = this.state.allListings[randomIndex].car.trim;
    const photos = this.state.allListings[randomIndex].photos;
    const listingId = this.state.allListings[randomIndex]._id

    this.setState({
      year: year,
      make: make,
      model: model,
      trim: trim,
      listingId: listingId,
      photos: [photos]
    });
    console.log(this.state.allListings);
  }

  render() {
    return (
      <div className="featured-component-container">
        <div className='featured-car-text'>Featured Car </div>
        <img src={this.state.photos} className='featured-photo'/>
        <div className="car-properties">
          <div className="featured-display">Year: {this.state.year}</div>
          <div className="featured-display">Make: {this.state.make}</div>
          <div className="featured-display">
            Model: {this.state.model}
          </div>
          <div className="featured-display">Trim: {this.state.trim}</div>
          <Link to={`/listing/${this.state.listingId}`}>
            <button className='view-listing-button'>View</button>
          </Link> 
        </div>
      </div>
    );
  }
}
