import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import {getMedata} from './../../_services/dataService/importData';


import Box from './../box/Box';


import { connect } from 'react-redux';
import {setFreq, setMyDuration} from './../../actions';

class ChartsPage extends React.Component {
    
    constructor(props){
        super(props);
        const f = this.props.my_freq;
        const i = this.props.my_duration;
        this.state = {
          labels:[],
          data:[],
          name: this.props.title,
          device_id: this.props.device_id,
          freq: f,
          duration: i,
        }    
    }

    componentWillUnmount(){
      clearInterval(this.interval);
    }
    
    componentWillReceiveProps({my_freq, my_duration, init_data, device_id}){
      
      //console.log(this.state);
      //console.log("INSIDE RECV ", device_id)
      this.setState({
        labels:[],
        data:[],
        device_id: device_id
      })

      const f = my_freq;
      const i = my_duration;

      //console.log("I recieved f and duration as ", f, i);

      this.setState({
        freq: f,
        duration: i,
      })

      let res = init_data
      //console.log("Chart Mount I recieved ", res);
      this.setState({
        labels: res.label,
        data: res.data,
        
      })

      
      clearInterval(this.interval);
      //console.log("OUT INTERVAL STATE:: ", this.state.labels);
      //console.log("OUT INTERVAL RECV:: ", init_data.label);
      //console.log("OUTSIDE INTERVAL::", my_freq)
      this.interval = setInterval(() => {
        //console.log("INSIDE INTERVAL:: ",my_freq)
        //console.log("INSIDE INTERVAL:: ", this.state.labels);
        getMedata(device_id, this.props.token).then(res => {
          this.setState(
          { 
              labels: this.state.labels.concat([res.label]),
              data: this.state.data.concat([res.data])
          })
        })
        
        let new_l = [...this.state.labels];
        let new_d = [...this.state.data];
        new_l.shift();
        new_d.shift();
        this.setState(
          { 
              labels: new_l,
              data: new_d
          })

          //clearInterval(this.interval);
          //this.interval = setInterval(cb, this.state.freq);
          
    }, my_freq*1000 
    );
    }
    

    componentDidMount() {
      //console.log(this.props.device_id)
      this.setState({id: this.props.device_id})
      //console.log("FROM THE CHART ", this.state.device_id);
    }
  componentWillMount(){
    
    
  }

  render() {
    let database = {
      dataLine: {
      labels: this.state.labels,
      datasets: [
          {
          label: this.props.label,
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 206, 6)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 1,
          pointHoverRadius: 1,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.data
          }
      ]
      }
    };


    const options = {
      responsive: true, 
      animation: {duration: 0},
      scales: {
        xAxes: [{
            type: 'time',
            display: true,
            scaleLabel: {
                display: true,
                labelString: "Time",
            }
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: "temp in degree c",
            }
        }]
    }
    }
    
    return (
        <MDBContainer>
          
          <Box size="30px"></Box>
        
        
        <Line data={database.dataLine} options={options} />
        </MDBContainer>

    );
  }
}

const mapStateToProps = ({freq, duration, token }) => ({
  freq,
  duration,
  token
})

const mapDispatchToProps = (dispatch) => ({
  setFreq: (freq) => dispatch(setFreq(freq)),
  setMyDuration: (duration) => dispatch(setMyDuration(duration)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsPage);