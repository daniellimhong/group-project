import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ViewListing from "../ViewListing/ViewListing";

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
          <img src={listings.photos[0]} alt="" />
          <h2>Year: {listings.car.year}</h2>
          <h2>Make: {listings.car.make}</h2>
          <h2>Model: {listings.car.model}</h2>
          <h2>Trim: {listings.car.trim}</h2>
          {/* <h2>Id: {listings._id}</h2> */}
          <Link to={`/listing/${listings._id}`}>
            <button>View Listing</button>
          </Link> 
          <br />
        </div>
      );
    });
    return <div>{listingsToDisplay}</div>;
  }
}
