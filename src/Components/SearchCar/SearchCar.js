import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux"
import { getUser } from "../../redux/reducer"

class SearchCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      filtered: [],
    //   searchByYear: 0,
    //   searchByMake: "",
    //   searchByModel: "",
    //   searchByTrim: "",
    //   searchByPrice: 0,
      zipRadius: 100
    };
  }

  async componentDidMount() {
    const allListings = await axios
      .get("/listings/get_all_listings")
      .then(res => {
        return res.data;
      });
    this.setState({
      listings: allListings
    });
  }

  searchFunction(e) {
    e.preventDefault();
    let currentListings = this.state.listings;
    let filteredListings = this.state.filteredListings;
   
      filteredListings = currentListings.filter(search => {
          console.log("search", search)
          return search.car.make === this.state.searchByMake

      });

    this.setState({
      filtered: filteredListings
    });
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
      console.log("All Listings", this.state.listings)
    console.log("Filtered Listings",this.state.filtered);
    const {
      searchByMake,
    //   searchByModel,
    //   searchByPrice,
    //   searchByTrim,
    //   searchByYear,
    //   zipRadius
    } = this.state;
    return (
      <form onSubmit={e => this.searchFunction(e)}>
        <input
          type="text"
          placeholder="Search by Make"
          name="searchByMake"
          value={searchByMake}
          onChange={event =>
            this.universalChangeHandler(event.target.name, event.target.value)
          }
        />
        <input type="submit" value="Search" />
      </form>
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
  
  export default connectInvoked(SearchCar);
