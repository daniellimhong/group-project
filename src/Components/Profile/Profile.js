import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import EditProfile from "../EditProfile/EditProfile"
import axios from "axios";

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
        <div key={index}>
          <p>Listing #{index + 1}</p>
          <p>Year:{listings.car.year}</p>
          <p>Make:{listings.car.make}</p>
          <p>Model:{listings.car.model}</p>
          <p>Trim:{listings.car.trim}</p>
        </div>
      );
    });
    return (
      <div>
        {this.props.user ? (
          <div>
            <h2>Welcome, {this.props.user.username}</h2>
            <h3>{this.props.user.email}</h3>

            <h2>{userListingsToDisplay}</h2>
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
