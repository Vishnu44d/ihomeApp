import React, { Component } from 'react';
import Tables from './../components/tables/Tables';
import getMyDevices from './../_services/deviceService/getAllDevice';

import { connect } from 'react-redux';
import {setToken, logoutAction, setDevices} from './../actions';
import urls from './../conf';

class Dashbord extends Component {
    constructor(props){
        super(props)
        this.state = {
            devices: []
        }
    }
    componentDidMount(){
        const token = this.props.token;
        var base_url = urls.dev_url;
        fetch(`${base_url}device?auth=${token}`)
        .then(response=>{return response.json()})
        .then(response=>{
            this.props.setDevices(response.payload);
            this.setState({devices: response.payload})
            //return response.payload
            console.log(response)
        })
        console.log(getMyDevices(this.props.token));
    }
    render() {
        return (
            <div style={{marginTop:"-40px"}}>
                <h3 className="text-center">All devices</h3>
                <p className="text-left container">Here is the list of devices connected to your home. Click on the name of the device if you want to monitor the device.</p>
                <div className="container">
                    <Tables devices={this.state.devices}/>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = ({isLoggedIn, token, devices }) => ({
    isLoggedIn,
    token,
    devices
  })
  
  const mapDispatchToProps = (dispatch) => ({
    setToken: (token) => dispatch(setToken(token)),
    logoutAction: () => dispatch(logoutAction()),
    setDevices: (devices) => dispatch(setDevices(devices))
  })
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashbord);
