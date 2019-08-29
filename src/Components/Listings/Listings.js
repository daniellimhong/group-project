import React, { Component } from "react";
import axios from "axios";

export default class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Listings: {}
    };
  }

 async componentDidMount() {
    const allListings = await axios.get("/listings/get_all_listings").then(res => {
      return res.data;
    });
    this.setState({
      Listings: allListings
    });
  }

  render(){
      console.log(this.state.Listings)
      return(
          <div></div>
      )
  }
}
