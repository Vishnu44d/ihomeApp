import React, { Component } from 'react';
import Tables from './../components/tables/Tables';
import getMyDevices from './../_services/deviceService/getAllDevice';

export default class Dashbord extends Component {
    constructor(props){
        super(props)
        this.state = {
            devices: getMyDevices()
        }
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
