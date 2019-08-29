import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login";
import "./NavBar.scss";

export default function NavBar(props) {
  return (
    <div>
      <div>
        <NavLink exact to="/ForSale" activeClassName="active">
          Cars For Sale
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/SellCar" activeClassName="active">
          Sell Your Car
        </NavLink>
      </div>
      <div>
          <NavLink to="/NewListing" activeClassName="active">
              New Listing
          </NavLink>
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
}
