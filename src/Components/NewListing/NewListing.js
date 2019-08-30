import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";

class NewListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 0,
      make: "",
      model: "",
      trim: "",
      mileage: 0,
      price: 0,
      zip: 10000,
      file: null
    };
    this.addListing = this.addListing.bind(this);
  }

  addListing(e) {
    e.preventDefault();
    axios
      .post("/listings/create_listing", {
        car: {
          year: this.state.year,
          make: this.state.make,
          model: this.state.model,
          trim: this.state.trim,
          mileage: this.state.mileage
        },
        price: this.state.salePrice,
        zip: this.state.zipCode
      })
      .then(res => {
        this.props.getUser(res.data);
      });
  }

  submitFile = (event) => {
    event.preventDefault();
    if(!this.state.file){
        alert('Please select a file!')
    }
    else {
        const formData = new FormData();
        formData.append('file', this.state.file[0]);
        
        console.log(`this is the file`, formData)
        axios.post('/api/file_upload', formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then(response => {
            console.log(response)
            this.setState({
                file: response.data.Location,
                loading: false
            })
          // handle your response;
        }).catch(error => {
            console.log(error)
          // handle your error
        });

    }
 
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    const { year, make, model, trim, mileage, price, zip } = this.state;
    console.log("Redux", this.props.user);
    console.log("Year", this.state.year);
    return (
      <div>
        <div className="newListing-container">
          <form onSubmit={this.addListing}>
            Year
            <input
              type="number"
              placeholder="Year"
              name="year"
              value={year}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            Make
            <input
              type="text"
              placeholder="Make"
              name="make"
              value={make}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            Model
            <input
              type="text"
              placeholder="Model"
              name="model"
              value={model}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            Trim
            <input
              type="text"
              placeholder="Trim"
              name="trim"
              value={trim}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            Mileage
            <input
              type="number"
              placeholder="Mileage"
              name="mileage"
              value={mileage}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            Price
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={price}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            ZipCode
            <input
              type="number"
              placeholder="ZipCode"
              name="zip"
              value={zip}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            <input type="submit" value="Submit" />
           
          </form>

          <form onSubmit={this.submitFile}>
              <input
                label="upload file"
                type="file"
                onChange={this.handleFileUpload}
              />
              <button type="submit">Send</button>
            </form>
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

export default connectInvoked(NewListing);
