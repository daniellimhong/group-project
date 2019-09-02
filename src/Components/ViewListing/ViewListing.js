import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux"
import { getUser } from "../../redux/reducer"

class ViewListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listing: []
    };
  }

  async componentDidMount(){
      const listing = await axios
      .get(`/listings/get_listing/${this.props.match.params.id}`)
      .then(res => {
        //   console.log(res.data);
        return res.data
      })
      this.setState({
        listing: listing
    })
  }

  render() {
      console.log(this.state.listing.car);
      const { listing } = this.state

    return (
    <div>
        {this.state.listing ? (
        <div>
        <img src={listing.photos} alt="" />
        <h2>Price: {listing.price}</h2>
        <h2> Zip: {listing.zip} </h2>
        {listing && listing.car && 
        <div>
        <h2>Year: {listing.car.year} </h2>
          <h2>Make: {listing.car.make}</h2>
          <h2>Model: {listing.car.model}</h2>
          <h2>Trim: {listing.car.trim}</h2>
          </div>
        }
        <h2>Date Added: {listing.date_added}</h2>
        </div>
        ) : (
            <div></div>
        )}{" "}
        <button>Contact Seller</button>
        {/* //! Display Seller's ID */}
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
  
  export default connectInvoked(ViewListing);