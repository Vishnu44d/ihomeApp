import React, { Component} from 'react';
import './App.css';

import Login from './components/pages/Login';

import NavBar from './components/pages/NavBar';
import Footer from './components/pages/Footer';


import {BrowserRouter, Route} from 'react-router-dom';
import Devices from './layouts/Devices';
import Dashbord from './layouts/Dashbord';
import EditDashbord from './layouts/EditDash';
import {ProtectedRoute} from './protectedRoute';
import {UnProtectedRoute} from './unProtectedRoute';


import { connect } from 'react-redux';
import {setToken, logoutAction} from './actions';
import auth from './_services/userService/auth';


class App extends Component {
  
  componentDidMount(){
    try {
      const token =window.localStorage.token;
      if(typeof token !== "undefined")
      {
        this.props.setToken(token);
        auth.login(() => {
          this.props.history.push("/dashbord/");
        });
      }
      
    } catch (error) {
      console.log(error.toString());
    }
    
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
        
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({isLoggedIn, token }) => ({
  isLoggedIn,
  token
})

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setToken(token)),
  logoutAction: () => dispatch(logoutAction())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);