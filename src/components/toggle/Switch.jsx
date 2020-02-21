import React, { Component } from 'react'
import { CustomInput } from 'reactstrap';
import Spin from './../spinner/Spin';
export default class Switch extends Component {
    constructor(props){
        super(props)
        //console.log("DEBUG:: ", this.props.status)
        let l = this.props.status ? "ON": "OFF";
        this.state={
            status: this.props.status,
            label: l,
            loading: false,
            name: this.props.name
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
        

        //NETWORK CALL HERE..

        this.setState({
            loading:false
        })

    }
    render() {
        return (
            <div>
                {
                    !this.state.loading?
                        <CustomInput color="dark" checked={this.state.status} type="switch" id={this.props.name} name="customSwitch" label={this.state.label} onClick={this.toggle}/>
                    :
                    <Spin size="sm" lastColor="light"/>
                }
                </div>
        )
    }
}
