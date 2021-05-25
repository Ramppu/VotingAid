import React, { createContext, Component } from 'react';

export const UserContext = createContext();

class UserContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = this.existingLogin() || {
      user: 'Quest',
      email: '',
      loggedIn: false,
      language: 'fin' // suomi vai englanti - fix
    }
  }

  changeLangague = (e) => {
    this.setState({ language: e })
    console.log("is the language working")
  }

  changeUser = (user, email, loggedIn) => {
    this.setState({
      user: user,
      email: email,
      loggedIn: loggedIn
    });
  }

  logOut = () => {
    this.changeUser('Quest', '', false);
    sessionStorage.clear();
  }

  checkExistingLogin = () => {
    var email = sessionStorage.getItem('email');
    var status = sessionStorage.getItem('status');
    if (email && status) {
      this.changeUser(status, email, true);
    }
  }

  existingLogin() {
    var email = sessionStorage.getItem('email');
    var status = sessionStorage.getItem('status');
    if (email && status) {
      return {
        user: status,
        email: email,
        loggedIn: true
      }
    }
  }

  render() {
    return (
      <UserContext.Provider value={{
        ...this.state,
        changeUser: this.changeUser,
        checkExistingLogin: this.checkExistingLogin,
        logOut: this.logOut,
        changeLangague: this.changeLangague
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
