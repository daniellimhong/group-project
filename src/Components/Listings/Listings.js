import React, { Component } from "react";
import SearchCar from "../SearchCar/SearchCar";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Listings.scss";

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
      Listings: allListings
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
    let listingsToDisplay;
    if (!this.state.filteredListingsFromChild) {
      listingsToDisplay = this.state.Listings.map((listings, index) => {
        return (
          <div key={index} className='mapped-listing-container'>
            <img className="Mapped-listing-pic" src={listings.photos} alt="" />
            <p>Price: ${listings.price}</p>
            <p>Year: {listings.car.year}</p>
            <p>Make: {listings.car.make}</p>
            <p>Model: {listings.car.model}</p>
            <p>Trim: {listings.car.trim}</p>
            <p>Zip Code: {listings.zip}</p>

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
            <div className="content" key={index}>
              <img
                className="Mapped-listing-pic"
                src={listings.photos}
                alt=""
              />
              <p>Price: ${listings.price}</p>
              <p>Year: {listings.car.year}</p>
              <p>Make: {listings.car.make}</p>
              <p>Model: {listings.car.model}</p>
              <p>Trim: {listings.car.trim}</p>
              <p>Zip Code: {listings.zip}</p>

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
      <div className="listings-main-container">
        <div className="search-car-component">
          <SearchCar
            callbackFromParent={this.myCallback}
            resetParent={this.resetCallback}
          />
        </div>
        <div className="listing-display">{listingsToDisplay.reverse()}</div>
      </div>
    );
  }
}
