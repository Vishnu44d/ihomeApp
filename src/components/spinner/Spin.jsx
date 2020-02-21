import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

export default class Spin extends Component {
    constructor(props){
        super(props)
        this.state = {
            size: this.props.size
        }
    }
    render() {
        return (
            <div>
                <Spinner size={this.state.size} type="grow" color="danger" /> 
                <Spinner size={this.state.size} type="grow" color="warning" />
                <Spinner size={this.state.size} type="grow" color={this.props.lastColor} /> 
            </div>
        )
    }
}
