import React, { Component } from "react";
import SearchCar from "../SearchCar/SearchCar";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Listings.scss"

export default class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Listings: [],
      filteredListingsFromChild: null
    };
  }

  async componentDidMount() {
    const allListings = await axios
      .get("/listings/get_all_listings")
      .then(res => {
        return res.data;
      });
    this.setState({
      Listings: allListings,
    });
  }

  myCallback = dataFromChild => {
    this.setState({
      filteredListingsFromChild: dataFromChild
    });
  };

  resetCallback = dataFromChild => {
    this.setState({
      filteredListingsFromChild: null
    });
  };

  render() {
    // console.log("filteredFromChild", this.state.filteredListingsFromChild);

    let listingsToDisplay;
    if (!this.state.filteredListingsFromChild) {
      listingsToDisplay = this.state.Listings.map((listings, index) => {
        return (
          <div key={index}>
            <img className="Mapped-listing-pic" src={listings.photos[0]} alt="" />
            <p>Price: ${listings.price}</p>
            <p>Year: {listings.car.year}</p>
            <p>Make: {listings.car.make}</p>
            <p>Model: {listings.car.model}</p>
            <p>Trim: {listings.car.trim}</p>
            
            <Link to={`/listing/${listings._id}`}>
            <button>View Listing</button>
          </Link> 
            <br />
          </div>
        );
      });
    } else {
      listingsToDisplay = this.state.filteredListingsFromChild.map(
        (listings, index) => {
          return (
            <div className="Listing" key={index}>
              <img className="Mapped-listing-pic" src={listings.photos[0]} alt="" />

              <p>Year: {listings.car.year}</p>
              <p>Make: {listings.car.make}</p>
              <p>Model: {listings.car.model}</p>
              <p>Trim: {listings.car.trim}</p>
            
              <Link to={`/listing/${listings._id}`}>
            <button>View Listing</button>
          </Link> 
              <br />
            </div>
          );
        }
      );
    }

    return (
      <div className="Listings-main-container">
        <SearchCar
          callbackFromParent={this.myCallback}
          resetParent={this.resetCallback}
        />
        <div className="Listing-display">{listingsToDisplay.reverse()}</div>
      </div>
    );
  }
}
