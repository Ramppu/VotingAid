import React, { Component } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverResponse: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    }

    axios.post('http://localhost:5000/login',  user)
      .then(res => {
        //cookies.set(res.data.email,res.data.status,{secure: true});
        this.setState({serverResponse: res.data.email});
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
          <button type="submit">Login</button>
        </form>
        <h1>{this.state.serverResponse}</h1>
      </div>
    );
  }
}

export default Login;