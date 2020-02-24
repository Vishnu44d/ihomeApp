import React, {useState, Component} from 'react';
import './App.css';

import Login from './components/pages/Login';

import NavBar from './components/pages/NavBar';
import Footer from './components/pages/Footer';
import Toast from './components/toast/Toast';


import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Devices from './layouts/Devices';
import Dashbord from './layouts/Dashbord';
import EditDashbord from './layouts/EditDash';
import {ProtectedRoute} from './protectedRoute';
import {UnProtectedRoute} from './unProtectedRoute';





class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <BrowserRouter >
          <Route path="*" component={NavBar}></Route>
          <UnProtectedRoute exact path="/" component={Login}></UnProtectedRoute>
          <UnProtectedRoute path="/login" component={Login}></UnProtectedRoute>
          <ProtectedRoute path="/devices" component={Devices}></ProtectedRoute>
          <ProtectedRoute path="/dashbord" component={Dashbord}></ProtectedRoute>
          <ProtectedRoute path="/editDevices" component={EditDashbord}></ProtectedRoute>
        <Footer/>
        <Toast msg="Hey I am calling from here!!"/>
      </BrowserRouter>
    );
  }
}

export default App;
