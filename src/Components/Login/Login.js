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
      password: ""
    };
  }
  
    login() {
    const { username, password } = this.state;
    axios
      .post(`/auth/login`, { username: username, password: password })
      .then(res => {
        // console.log(res.data);
        if (res.data.message) {
          alert(res.data.message);
        } else {
          this.props.getUser(res.data);
          console.log(this.props.getUser)
        }
      });
  }

  logout = () => {
    axios.get('/auth/logout').then(res => {
      console.log(this.props)
      this.props.getUser(null)
      this.props.history.push('/')
    })
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
    // if (!this.props.user) {
    //   return <></>; //this checks to see if redux has a user and if not returns nothing to allow componentDidMount to run first
    // }
    console.log('this is props',this.props.user)
    return (
      <div>
        <div className= {!this.props.user ? "showLogin" : "hideLogin"}>
       
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
        <div className={this.props.user ? 'showLogout' : 'hideLogout' }>
            <button onClick={this.logout}>Logout</button>
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

