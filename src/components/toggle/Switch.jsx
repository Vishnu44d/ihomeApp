import React, { Component } from 'react'
import { CustomInput } from 'reactstrap';
import Spin from './../spinner/Spin';
import urls from './../../conf';

import { connect } from 'react-redux';

var base_url = urls.dev_url;

class Switch extends Component {
    constructor(props){
        super(props)
        //console.log("DEBUG:: ", this.props.status)
        let l = this.props.status ? "ON": "OFF";
        this.state={
            status: this.props.status,
            label: l,
            loading: false,
            name: this.props.name          //this is actually device_id not name
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(e){
        let l = this.state.status ? "OFF": "ON";
        this.setState({
            loading:true
        })

        this.setState({
            status: !this.state.status,
            label: l
        })
        

        // NETWORK CALL HERE..
        // console.log("IN THE SWITCH:: ", this.state.name);
        // console.log("IN SWITCH ", this.props.token);
        // console.log("In the switch:: ", this.state.label);
        let operation = this.state.label === "ON"? "OFF":"ON"
        console.log("OPEARTION:: ", operation)
        fetch(`${base_url}device/toggle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "device_name": this.state.name,
                "token": this.props.token,
                "operation": operation
            })
        }).then(response => response.json()).then(resp => {
            // console.log(resp.message)
            if(resp.message==="published"){
                // console.log("published")
            }
            else{
                let l = this.state.status ? "OFF": "ON";
                this.setState({
                    status: !this.state.status,
                    label: l
                })
            }
            this.setState({
                loading:false
            })
        })    

    }
    render() {
        return (
            <div>
                {
                    !this.state.loading?
                        <CustomInput 
                            color="dark" 
                            checked={this.state.status} 
                            type="switch" id={this.props.name} 
                            name="customSwitch" 
                            label={this.state.label} 
                            onClick={this.toggle} 
                            onChange={()=>{console.log("changed")}}
                        />
                    :
                    <Spin size="sm" lastColor="light"/>
                }
                </div>
        )
    }
}

const mapStateToProps = ({token }) => ({
    token,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    
  })
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Switch);