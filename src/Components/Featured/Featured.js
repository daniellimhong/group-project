import React, { Component } from "react";
import axios from "axios";

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
  }

  render() {
    console.log(
      "all listings",
      this.state.allListings[this.state.randomListingIndex]
    );
    console.log("random listing index", this.state.randomListingIndex);

    return (
      <div>
        <div>Year: {this.state.year}</div>
        <div>make: {this.state.make}</div>
        <div>model: {this.state.model}</div>
        <div>trim: {this.state.trim}</div>
        <div>photos: {[this.state.photos]}</div>
      </div>
    );
  }
}
