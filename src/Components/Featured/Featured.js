import React, { Component } from "react";
import axios from "axios";
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

    this.setState({
      year: year,
      make: make,
      model: model,
      trim: trim,
      photos: [photos]
    });
    console.log(this.state.allListings);
  }

  render() {
    return (
      <div className="featured-component-container">
        <img src={this.state.photos} />
        <div className="car-properties">
          <div className="featured-display-year">Year: {this.state.year}</div>
          <div className="featured-display-make">Make: {this.state.make}</div>
          <div className="featured-display-model">
            Model: {this.state.model}
          </div>
          <div className="featured-display-trim">Trim: {this.state.trim}</div>
        </div>
      </div>
    );
  }
}
