import React, { Component } from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import './Login.scss'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showLogin: true
    };
  }

  login() {
    const { username, password } = this.state;
    axios
      .post(`/auth/login`, { username: username, password: password })
      .then(res => {
        console.log(res.data);
        if (res.data.message) {
          alert(res.data.message);
        } else {
          this.props.getUser(res.data);
          
          alert(`You are logged in!`);
        }
      });
  }

  reDirecttoRegister = () => {
    this.props.history.push('/register')
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    
    return (
      <div>
        <div className='login-container'>
          <input
            placeholder="username"
            name="username"
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
        <div className='login-button'>
          <button onClick={e => this.login(e)}>Login</button>
          <button onClick={this.reDirecttoRegister}>Register</button>
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

export default withRouter(connectInvoked(Login));