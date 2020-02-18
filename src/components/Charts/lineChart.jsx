import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import getMedata from './../../_services/dataService/importData';

class ChartsPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
          labels:[],
          data:[]
        }
        
    }
    

    componentDidMount() {
      let l = [];
      let d = [];
      for(let i=0; i<10; i++)
      {
        l.push(getMedata());
        d.push(getMedata());
      }
      this.setState({
        labels: l,
        data: d
      })
      this.interval = setInterval(() => {
          //console.log(this.state);
          this.setState(
          { 
              labels: this.state.labels.concat([getMedata()]),
              data: this.state.data.concat([getMedata()])
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
      }, 5000  
      );
      console.log(this.state);
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
          pointBorderWidth: 10,
          pointHoverRadius: 5,
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
    return (
      <MDBContainer>
        <h3 className="mt-5">{this.props.title}</h3>
        <Line data={database.dataLine} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;