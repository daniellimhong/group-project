import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
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
          <button onClick>Login</button>
        </div>
      </div>
    );
  }
}
