import React, { Component } from "react";
import axios from "axios";

export default class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Listings: []
    };
  }

  async componentDidMount() {
    const allListings = await axios
      .get("/listings/get_all_listings")
      .then(res => {
        return res.data;
      });
    this.setState({
      Listings: allListings
    });
  }

  render() {
    // console.log(this.state.Listings)
    const listingsToDisplay = this.state.Listings.map((listings, index) => {
      return (
        <div key={index}>
          <h1>Year:{listings.car.year}</h1>
          <h1>Make:{listings.car.make}</h1>
          <h1>Model:{listings.car.model}</h1>
          <h1>Trim:{listings.car.trim}</h1>
          {/* Change H1 tags to something else */}
          <img src={listings.photos[0]} alt="" />
          <br />
        </div>
      );
    });
    return <div>{listingsToDisplay}</div>;
  }
}
