import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import { Link } from "react-router-dom";
import EditProfile from "../EditProfile/EditProfile";
import axios from "axios";
import "./Profile.scss";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: []
    };
  }

  async componentDidMount() {
    const userListings = await axios
      .get("/listings/get_user_listings")
      .then(res => {
        return res.data;
      });
    this.setState({
      listings: userListings
    });
  }

  render() {
    console.log(this.props.user);
    //! figure out how to destructure
    // let { username, email, listings } = this.props.user;

    const userListingsToDisplay = this.state.listings.map((listings, index) => {
      return (
        <div className="Profile-listing" key={index}>
          <p className="Listing-title">Listing #{index + 1}</p>
          <img className="Mapped-listing-pic" src={listings.photos} alt="" />
          <p>Price: ${listings.price}</p>
          <p>Year: {listings.car.year}</p>
          <p>Make: {listings.car.make}</p>
          <p>Model: {listings.car.model}</p>
          <p>Trim: {listings.car.trim}</p>
          
          <div className="Button-div"> 
          <Link to={`/listing/${listings._id}`}>
            <button className="View-Button-1">View Listing</button>
          </Link>

          <button
            onClick={e => {
              e.preventDefault();
              axios
                .delete(`/listings/delete_listing/${listings._id}`)
                .then(res => {
                  this.setState({ listings: res.data });
                  alert("Listing Deleted!");
                });
            }}
          >
            Delete Listing
          </button>
          </div>
        </div>
      );
    });
    return (
      <div className="Profile-container">
        {this.props.user ? (
          <div className="Secondary-container">
            <section className="User-text">
              <h2 className="Welcome">
                Welcome, <b>{this.props.user.username}</b>
              </h2>
              <h3 className="Profile-email">Email: {this.props.user.email}</h3>
            </section>

            <h2 className="User-text2">Your Current Listings</h2>
            <div className="User-listing-container">
              {userListingsToDisplay}
            </div>
          </div>
        ) : (
          <div></div>
        )}{" "}
        {/* Conditional Rendering */}
        <div>
          <EditProfile />
        </div>
      </div>
    );
  }
}

function mapReduxToProps(reduxState) {
  return reduxState;
}

const mapDispatchToProps = {
  getUser
};

const connectInvoked = connect(
  mapReduxToProps,
  mapDispatchToProps
);

export default connectInvoked(Profile);
