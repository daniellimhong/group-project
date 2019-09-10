import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import "./ViewListing.scss";

class ViewListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listing: [],
      userInfo: []
    };
  }

  async componentDidMount() {
    const listing = await axios
      .get(`/listings/get_listing/${this.props.match.params.id}`)

      .then(res => {
        // console.log(res.data);
        axios
          .get(`/listings/get_user_contact/${this.props.match.params.id}`)
          .then(res => {
            this.setState({
              userInfo: res.data[0]
            });
            // console.log(res.data[0])
          });
        return res.data;
      });
    this.setState({
      listing: listing
    });
  }

  render() {
    const { listing, userInfo } = this.state;

    return (
      <div className="View-listing-container">
        {this.state.listing ? (
          <div className="View-listing">
            <img className="Mapped-listing-pic" src={listing.photos} alt="" />
            <p>Price: ${listing.price}</p>
           
            {listing && listing.car && userInfo && userInfo.username && (
              <div>
                <p>Year: {listing.car.year} </p>
                <p>Make: {listing.car.make}</p>
                <p>Model: {listing.car.model}</p>
                <p>Trim: {listing.car.trim}</p>
                <p> Zip: {listing.zip} </p>
                <p>Seller: {userInfo.username}</p>
                <p>Date Added: {listing.date_added}</p>
                <div>
                  <button
                    className="Button-div"
                    onClick={() => {
                      window.open(
                        `mailto:${userInfo.email}` +
                          "?subject=" +
                          `I am interested in your ${listing.car.year} ${listing.car.make} ${listing.car.model}!` +
                          "&body=" +
                          `Hello, ${userInfo.username}!`
                      );
                    }}
                  >
                    Contact Seller
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}{" "}
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
