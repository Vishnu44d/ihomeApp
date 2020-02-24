import React, { Component } from 'react';
import {MDBContainer} from 'mdbreact';
import Range from './../components/slider/Range';
import ChartsPage from './../components/Charts/lineChart';
import getDataOf from './../_services/deviceService/getDeviceData';
import AboutCard from './../components/card/AboutCard';
import Box from './../components/box/Box';
import {shortdurations, longdurations, shortfrequency, longfrequency} from './../CONSTANTS/Durations/Duration';
import {getRangeData} from './../_services/dataService/importData';
import {Col, Row} from 'reactstrap';
import DropMenu from './../components/dropdown/DropMenu';
import Spin from './../components/spinner/Spin';

import { connect } from 'react-redux';
import {setFreq, setMyDuration} from './../actions';

class Devices extends Component {
    constructor(props){
        super(props)
        this.state = {
            device_name: "",
            min: null,
            max: null,
            currentValue: 0,
            location: "",
            about: [],
            Graphlabel: "",
            graphName: "",
            loading: false,
            init_data: null

        }
    }
    
    componentDidMount(){
        let r = getDataOf(this.state.device_name);
        this.setState({loading:true})
        this.setState({
            device_name: this.props.history.location.pathname.split("/")[2],
            min: r.min+1,
            max: r.max,
            about: r.about,
            location: r.location,
            currentValue: r.curr_value,
            Graphlabel: r.Graphlabel,
            graphName: r.graphName,
            init_data: getRangeData(parseInt(this.props.freq), parseInt(this.props.duration))
        })
        this.setState({loading:false})
        this.unlisten = this.props.history.listen((location, action) => {
            //console.log("on route change ", location);
            this.setState({loading:true})
            let r = getDataOf(this.state.device_name);

            this.setState({
                device_name: this.props.history.location.pathname.split("/")[2],
                min: r.min,
                max: r.max,
                about: r.about,
                location: r.location,
                currentValue: r.curr_value,
                Graphlabel: r.Graphlabel,
                graphName: r.graphName,
                init_data: getRangeData(parseInt(this.props.freq), parseInt(this.props.duration))
            })
            this.setState({loading:false})
        });
        
    }

    componentWillReceiveProps(nextProps){
        //console.log("Recieve props", nextProps);
        this.setState({loading:true})
        this.setState({
            init_data: getRangeData(parseInt(nextProps.freq), parseInt(nextProps.duration))
        })
        this.setState({loading:false})
    }

    componentWillMount(){
        
        
    }

    
    render() {
        //console.log(this.props.history.location.pathname)
        //const device_name = this.props.history.location.pathname.split("/")[2]
        const {device_name, min, max, currentValue, location, about,Graphlabel, graphName } = this.state;
        const init_data = this.state.init_data;
        console.log("INSIDE DEVICES:: ", init_data)
        return (
            <MDBContainer>
                <AboutCard about={about} name={this.state.device_name}/>
                <Box size="50px" />
                <Row>
                    <Col md={8} sm={1}>
                    <h3>{graphName}</h3>
                    </Col>
                    <Col md={4} sm={11} >
                    <Row>
                        <Col className="text-right">
                        <DropMenu
                            shortdurations={shortfrequency}
                            longdurations={longfrequency}
                            icon="retweet"
                            purpose="refresh rate"
                            data={this.props.freq}
                        />
                        </Col>
                        <Col className="text-left" >
                        <DropMenu
                        shortdurations={shortdurations}
                        longdurations={longdurations}
                        icon="clock"
                        purpose="duration"
                        data={this.props.duration}
                        />
                        </Col>
                    </Row>
                    
                    </Col>
                </Row>
                {
                    this.state.loading?<div className="text-center"><Box size="75px" /><Spin size="lg" lastColor="dark"/><p>Loading Chart . . .</p><Box size="75px" /></div>:
                    <div>
                    <ChartsPage
                    my_freq={parseInt(this.props.freq)}
                    my_duration={parseInt(this.props.duration)}
                    init_data={init_data}
                    />
                    <Box size="50px" />
                    <Range
                    data = {{
                        device: device_name,
                        min: min,
                        max: max,
                        currentValue: currentValue
                    }}
                    />
                    </div>
                }
                
            </MDBContainer>
        )
    }
}


const mapStateToProps = ({freq, duration }) => ({
    freq,
    duration
  })
  
  const mapDispatchToProps = (dispatch) => ({
    setFreq: (freq) => dispatch(setFreq(freq)),
    setMyDuration: (duration) => dispatch(setMyDuration(duration)),
  })
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Devices);