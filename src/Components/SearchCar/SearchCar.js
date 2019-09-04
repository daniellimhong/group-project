import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import "./Search.scss";

class SearchCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      filtered: [],
      searchByMake: "",
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
      //   console.log("search", search)
      return search.car.make === this.state.searchByMake;
    });

    this.setState({
      filtered: filteredListings
    });
    this.props.callbackFromParent(filteredListings);
  }

  resetForm(e) {
    e.preventDefault();
    this.setState({
      searchByMake: ""
    });
    this.props.resetParent("");
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    console.log("All Listings", this.state.listings);
    console.log("Filtered Listings", this.state.filtered);
    const { searchByMake } = this.state;
    return (
      <div className="search-form">
        <form
          onSubmit={e => this.searchFunction(e)}
          onReset={e => this.resetForm(e)}
        >
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
          <input type="reset" value="Reset" />
        </form>
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

export default connectInvoked(SearchCar);
