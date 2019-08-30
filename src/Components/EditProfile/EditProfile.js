import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import { withRouter } from "react-router-dom";
import "./EditProfile.scss"

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      currentEmail: "",
      deleteConfirmation: false
    };
  }

  

  changeEmail(event) {
    event.preventDefault();
    const { email } = this.state;

    axios.put(`/auth/edit_user/${this.props.user.id}`, { email: email }).then(res => {
      this.setState({ currentEmail: res.data })
      console.log(res.data)
      this.props.getUser(res.data); 
      alert("Email succesfully changed");
    });
  };

  deleteProfile(event){
      event.preventDefault();
      axios.delete(`/auth/delete_user/${this.props.user.id}`).then(res => {
          this.props.getUser(res.data);
          this.props.history.push("/")
      })
  }

  toggleDeleteConfirmation = (e) => {
      e.preventDefault();
    this.setState(prevState => {
        return {
            deleteConfirmation: !prevState.deleteConfirmation
        }
    })
    console.log('toggle button hit')
    console.log(this.state.deleteConfirmation)
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    console.log(this.props.user)
    const { email } = this.state;
    return (
      <div>
          {this.props.user ? (
        <div>
          <p>Current Email: {this.props.user.email}</p>
          <form onSubmit={e => this.changeEmail(e)}>
            <input
              placeholder="New Email"
              name="email"
              value={email}
              onChange={event =>
                this.universalChangeHandler(
                  event.target.name,
                  event.target.value
                )
              }
            />
            {/* <input
              placeholder="Confirm Password"
              name="email"
              value="email"
              onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
              }
            /> */}
            <input type="submit" value="Submit" />
          </form>
          <button 
          onClick={(e) => this.toggleDeleteConfirmation(e)}>
              Delete Profile
              </button>
          <div 
          className={this.state.deleteConfirmation ? "showing" : "false"}
          >
              <p>Are you sure you want to delete your account? If so, click "Confirm Delete" below.</p>
              <button 
              onClick={(event) => this.deleteProfile(event)}
              className="Delete-button"
              >Confirm Delete</button>
          </div>
        </div>) : 
          (
            <div onClick={() => {
              this.props.history.push("/");
            }} 
            className="Error-messsage-1">Uh-oh, looks looks like something went wrong here! Press on this to log back in!</div>
          )
          }{" "}
        {/* Conditional Rendering */}
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

export default withRouter(connectInvoked(EditProfile));
