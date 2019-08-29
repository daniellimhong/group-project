import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  login() {
    const { username, password } = this.state;
    axios
      .post(`/auth/login`, { userName: userName, password: password })
      .then(res => {
        console.log(res.data);
        if (res.data.message) {
          alert(res.data.message);
        } else {
          this.props.getUser(res.data);
          // this.props.history.push('/')
          alert(`You are logged in!`);
        }
      });
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <input
            placeholder="username"
            name="userName"
            type="username"
            onChange={e =>
              this.universalChangeHandler(e.target.name, e.target.value)
            }
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            onChange={e =>
              this.universalChangeHandler(e.target.name, e.target.value)
            }
          />
        </div>
        <div>
          <button onClick={e => this.login(e)}>Login</button>
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

export default connectInvoked(Login);
