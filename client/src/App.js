import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './views/partials/form.js'
import Navigation from './views/partials/navbar.js'
import Content from './views/partials/homeContent.js'
import Registration from './views/partials/registration.js'
import Login from './views/partials/login.js'

import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state={apiResponse:""};
    }


  render() {
    return (
      <div className="App">
      <BrowserRouter>
       <div>
         <Navigation />
           <Switch>
            <Route path="/Form" component={Form}/>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Registration}/>
            <Route path="/" component={Content}/>
          </Switch>
       </div>
      </BrowserRouter>
      </div>
    );
  }
}


export default App;