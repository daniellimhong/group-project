import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login";
import "./NavBar.scss";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true
    };
  }

  render() {
    console.log("this redux", this.props);
    return (
      <div className="navbar-container">
        <div className="links-container">
          <div>
            <NavLink exact to="/Listings" activeClassName="active">
              Cars For Sale
            </NavLink>
          </div>
          <div>
            {this.props.user ? (
              <NavLink exact to="/NewListing">
                Sell Your Car
              </NavLink>
            ) : (
              ''
            )}
          </div>

          <div>
            {this.props.user ? (
              <NavLink exact to="/Profile">
                Profile
              </NavLink>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="login-container">
          <Login />
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

export default connectInvoked(NavBar);
