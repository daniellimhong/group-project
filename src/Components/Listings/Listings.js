import React, { Component } from "react";
import SearchCar from "../SearchCar/SearchCar";
import axios from "axios";

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
    } else {
      listingsToDisplay = this.state.filteredListingsFromChild.map(
        (listings, index) => {
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
        }
      );
    }

    return (
      <div>
        <SearchCar
          callbackFromParent={this.myCallback}
          resetParent={this.resetCallback}
        />
        <div>{listingsToDisplay}</div>
      </div>
    );
  }
}
