//modules
import React, { Component } from 'react';
import {connect} from 'react-redux';


//actions
import {addGraph,xAxisValueSelect,addGraphComponentRef,graphInteraction} from 'actions/graphs'

//components
import Bar from './components/Bar'
import XAxisValueSelect from 'components/Graphs/components/XAxisValueSelect'
import {YAxisLabel} from 'components/Graphs/components/YAxisLabels'

//constants
import {GraphTypes} from 'constants/graphs';

class Graph extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.addGraph({ref:this.props.graphReference, optionalAxisSelectedValue:this.props.xAxis.values[0].value});
  }

  componentDidMount() {
    this.props.addGraphComponentRef(this.props.graphReference,this[this.props.graphReference]);
  }

  componentWillReceiveProps(nProps) {
    if(nProps.graphs != this.props.graphs) {
      // console.log(nProps.graphs)
    }
  }

  graphInteraction = (interactionType,event,graphSectionID) => {
    this.props.graphInteraction({interactionType,graphSectionID,graphReference:this.props.graphReference});
  }

  render() {
    //x axix
    let xAxis = {...this.props.xAxis};
    xAxis.selectedXAxisValue = this.props.graphs.graphs[this.props.graphReference] ? this.props.graphs.graphs[this.props.graphReference].optionalAxisSelectedValue : this.props.xAxis.values[0].value
    xAxis.selectedXAxisValueObject = this.props.xAxis.values.filter((value) => {return value.value == xAxis.selectedXAxisValue})[0];
    xAxis.maxXValue = Math.max.apply(Math, this.props.data.map( bar => { return bar[xAxis.selectedXAxisValue]; }));
    xAxis.maxXValueDigits = xAxis.maxXValue.toString().length;
    xAxis.largestDigit = parseInt(xAxis.maxXValue.toString().slice(0,1));
    xAxis.maxXAxisValue = (xAxis.largestDigit + 1) * Math.pow(10,xAxis.maxXValueDigits - 1);

    //y axis
      const selectedYAxisValue = this.props.yAxis.values[0].value;
      const selectedYAxisValueObject = this.props.yAxis.values[0];
    if(this.props.graphType == 'ScatterPlot') {
      const maxYValue = Math.max.apply(Math, this.props.data.map( bar => { return bar[xAxis.selectedXAxisValue]; }));
    }


    return (
      <div className="graph-component" style={{}}>
        {this.props.children}
        <YAxisLabel label={this.props.yAxis.axisLabel}/>
        <div className='title'>{this.props.title}</div>
        {this.props.graphType ==  GraphTypes.BAR_GRAPH.type &&
          <BarGraph
            xAxis={xAxis}
            data={this.props.data}
            graphReference={this.props.graphReference}
            yAxis={selectedYAxisValueObject}
            onXAxisValueSelect={(value) => this.props.xAxisValueSelect(value,this.props.graphReference)}
            setComponentRef={(node) => {this[this.props.graphReference] = node}}
            graphInteraction={this.graphInteraction}
          />
        }
        {this.props.graphType ==  GraphTypes.SCATTER_PLOT.type &&
          <ScatterPlot
            xAxis={xAxis}
            data={this.props.data}
            graphReference={this.props.graphReference}
            yAxis={this.props.yAxis}
            onXAxisValueSelect={(value) => this.props.xAxisValueSelect(value,this.props.graphReference)}
            setComponentRef={(node) => {this[this.props.graphReference] = node}}
          />
        }
      </div>
    );
  }
}

const ScatterPlot = ({xAxis,data,yAxis,graphReference,onXAxisValueSelect,setComponentRef}) => {
  return(
    <div>
    </div>
  )
}

const BarGraph = ({xAxis,data,yAxis,graphReference,onXAxisValueSelect,setComponentRef,graphInteraction}) => {
  return(
    <div className="graph-inner" ref={(node) => setComponentRef(node)}>
      {(data.length > 0) &&
        data.map((bar, index) => {
          return(
            <Bar
              data={bar}
              key={bar[yAxis.value]}
              id={bar[yAxis.value]}
              yAxis={yAxis}
              xAxis={xAxis.selectedXAxisValueObject}
              graphReference={graphReference}
              maxXAxisValue={xAxis.maxXAxisValue}
              graphInteraction={graphInteraction}
            />
          )
      })}
      <AxisIncrements maxValue={xAxis.maxXAxisValue} axis='x'/>
      <XAxisValueSelect
        xAxisValues={xAxis.values}
        graphReference={graphReference}
        onChange={onXAxisValueSelect}
      />
    </div>
  )
}


const AxisIncrements = ({maxValue,axis}) => {
  let values = [];

  for(let i = 0; i < 11; i++) {
    values.push({value: (maxValue / 10) * i, position: i * 10});
  }

  return (
    <div className={`${axis}-axis-labels`}>
      {values.map((value, index) => {
        return(
          <div className={`${axis}-axis-increment`} style={{left: value.position + '%'}} key={index}>
            {value.value}
          </div>
        )
      })}
    </div>
  )
}

export default connect(({planets,graphs}) => ({planets,graphs}) ,{
  addGraph,
  xAxisValueSelect,
  addGraphComponentRef,
  graphInteraction
})(Graph);
