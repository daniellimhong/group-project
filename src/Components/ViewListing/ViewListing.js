import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux"
import { getUser } from "../../redux/reducer"



class ViewListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listing: [],
      userInfo: []
    };
  }

  async componentDidMount(){
      const listing = await axios
      .get(`/listings/get_listing/${this.props.match.params.id}`)
      
      .then(res => {
          // console.log(res.data);
          axios.get(`/listings/get_user_contact/${this.props.match.params.id}`)
            .then(res => {
              this.setState({
                userInfo: res.data[0]
              })
              // console.log(res.data[0])
            })
        return res.data
      })
      this.setState({
        listing: listing
    })
  }

  render() {
      const { listing, userInfo } = this.state

    return (
    <div>
        {this.state.listing ? (
        <div>
        <img src={listing.photos} alt="" />
        <h2>Price: {listing.price}</h2>
        <h2> Zip: {listing.zip} </h2>
        {listing && listing.car && userInfo && userInfo.username &&
        <div>
        <h2>Year: {listing.car.year} </h2>
          <h2>Make: {listing.car.make}</h2>
          <h2>Model: {listing.car.model}</h2>
          <h2>Trim: {listing.car.trim}</h2>
          <h2>Seller: {userInfo.username}</h2>
          <h2>Date Added: {listing.date_added}</h2>
          </div>
        }
        </div>
        ) : (
            <div></div>
        )}{" "}
        <button
        onClick={() => {window.open(`mailto:${userInfo.email}`)}}
        >Contact Seller</button>
        {/* <Mailto email={userInfo.email}>
          Contact Seller
        </Mailto> */}
        {/* //! Display Seller's Email */}
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