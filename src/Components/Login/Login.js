import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  login() {
    const { userName, password } = this.state;
    axios
      .post(`/auth/login`, { userName: userName, password: password })
      .then(res => {
        // res.data
      });
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    return (
      <div>
        <div>
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
        <div>
          <button onClick={e => this.login(e)}>Login</button>
        </div>
      </div>
    );
  }
}
