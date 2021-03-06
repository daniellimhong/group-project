import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import NewListing from "./Components/NewListing/NewListing";
import NavBar from "./Components/NavBar/NavBar";
// import ForSale from "./Components/ForSale/ForSale";
// import YourListing from "./Components/YourListing/YourListing";
// import Contact from "./Components/Contact/Contact";
import Featured from "./Components/Featured/Featured";
import Profile from "./Components/Profile/Profile";
import Listings from "./Components/Listings/Listings";
// import EditProfile from "./Components/EditProfile/EditProfile";
import ViewListing from "./Components/ViewListing/ViewListing";
import Axios from "axios";
import { connect } from "react-redux";
import { getUser } from "./redux/reducer";
import "./App.scss";

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    Axios.get("/auth/session").then(res => {
      this.props.getUser(res.data);
    });
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/newlisting" component={NewListing} />
            <Route path="/listings" component={Listings} />
            <Route path="/featured" component={Featured} />
            {/* <Route path='/listing/:listId' component={Listing} />   */}
            {/* <Route path="/sellcar" component={SellCar}/> */}
            {/* <Route path="/forsale" component={ForSale}/> */}
            {/* <Route path="/yourlisting" component={YourListing}/> */}
            {/* <Route path="/contact" component={Contact}/> */}
            <Route path="/profile" component={Profile} />
            <Route path="/listing/:id" component={ViewListing} />
            {/* <Route path="/editprofile" component={EditProfile} /> */}
          </Switch>
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

export default connectInvoked(App);
