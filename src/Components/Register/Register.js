import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import './Register.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
    this.register = this.register.bind(this);
  }

  register() {
    const { username, password, email } = this.state;
    axios
      .post(`/auth/register`, {
        username: username,
        password: password,
        email: email
      })
      .then(res => {
          console.log(this.props)
        this.props.getUser(res.data);
      });
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    const { username, password, email } = this.state;
    return (
    <div>
      <div className='directions'>
        <h1>Please register to create a profile</h1>
      </div>
        <div className='register-container'>
          <div className='register'>
            <input
            placeholder="username"
            name="username"
            type="username"
            value={username}
            onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
            }
            />
            <input
            placeholder="password"
            name="password"
            type="password"
            value={password}
            onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
            }
            />
            <input
            placeholder="email"
            name="email"
            type="email"
            value={email}
            onChange={e =>
                this.universalChangeHandler(e.target.name, e.target.value)
            }
            />
              
                  <button onClick={this.register}>Register</button>
              
            </div>
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

export default connectInvoked(Register);
