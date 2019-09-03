import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login";
import "./NavBar.scss";

export default class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      showLogin: true
    }
  }

  render(){
    return (
      <div className='navbar-container'>
        <div className='links-container'>
          <div>
            <NavLink exact to="/forsale" activeClassName="active">
              Cars For Sale
            </NavLink>
          </div>
          <div>
            <NavLink exact to="/newlisting" activeClassName="active">
              Sell Your Car
            </NavLink>
          </div>
        </div>
  
        <div className='login-container'>
          <Login />
        </div>
      </div>
    );
  }
  
}
