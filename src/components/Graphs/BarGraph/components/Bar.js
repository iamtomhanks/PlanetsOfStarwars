//modules
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Spring} from 'react-spring'

//components
import {YAxisDataLabel} from 'components/Graphs/components/YAxisLabels'

class Bar extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div className="bar-component">
        <YAxisDataLabel label={this.props.data[this.props.yAxis.value]} />
        <DisplayBar {...this.props}/>
      </div>
    );
  }
}

const DisplayBar = (props) => {
  let graphReference = props.graphs.graphs[props.graphReference];
  let barWidth = 0;
  if(graphReference && graphReference.componentRef) {
    let graphWidth = graphReference.componentRef.getBoundingClientRect().width;
    if(!isNaN(props.data[props.xAxis.value])){
      barWidth = (props.data[props.xAxis.value] / props.maxXAxisValue) * graphWidth;
    }
  }

  return (

    <Spring
      delay={0}
      from={{opacity: 0, width: 0, marginLeft:'-100%'}}
      to={{opacity: 1, width: barWidth, marginLeft:'0'}}
    >
      {({opacity, width, marginLeft}) => (
        <div className='display-bar' style={{opacity, width}}>

        </div>
      )}
    </Spring>
  )
}



export default connect(({graphs}) => ({graphs}) ,{})(Bar);
