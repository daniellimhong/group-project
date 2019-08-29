import React, { Component } from "react";
import axios from 'axios';

export default class NewListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 0,
      make: "",
      model: "",
      trim: "",
      mileage: 0,
      salePrice: 0,
      zipCode: 10000
    };
  }
  addListing(e) {
    e.preventDefault();
    axios.post("/listings/create_listing", {
      car: {
        year: this.year,
        make: this.make,
        model: this.model,
        trim: this.trim,
        mileage: this.mileage
      },
      price: this.salePrice,
      zip: this.zipCode
    });
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    const { year, make, model, trim, mileage, salePrice, zipCode } = this.state;
    console.log("userSession", req.session.user)
    return (
      <div>
        <div className="newListing-container">
          <form onSubmit={this.addListing}>
            <input
              type="number"
              placeholder="Year"
              name="year"
              value={year}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            <input
              type="text"
              placeholder="Make"
              name="make"
              value={make}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            <input
              type="text"
              placeholder="Model"
              name="model"
              value={model}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            <input
              type="text"
              placeholder="Trim"
              name="trim"
              value={trim}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            <input
              type="number"
              placeholder="Mileage"
              name="mileage"
              value={mileage}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={salePrice}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            <input
              type="number"
              placeholder="ZipCode"
              name="zip"
              value={zipCode}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
