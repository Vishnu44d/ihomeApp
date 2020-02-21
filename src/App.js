import React, {useState, Component} from 'react';
import './App.css';

import Login from './components/pages/Login';

import NavBar from './components/pages/NavBar';
import Footer from './components/pages/Footer';

import { MDBContainer } from "mdbreact";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Devices from './layouts/Devices';
import Dashbord from './layouts/Dashbord';
import {ProtectedRoute} from './protectedRoute';



class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <BrowserRouter >
          <Route path="*" component={NavBar}></Route>
          <Route exact path="/" component={Login}></Route>
          <Route path="/login" component={Login}></Route>
          <ProtectedRoute path="/devices" component={Devices}></ProtectedRoute>
          <ProtectedRoute path="/dashbord" component={Dashbord}></ProtectedRoute>
        <Footer/>
      
      </BrowserRouter>
    );
  }
}

export default App;
