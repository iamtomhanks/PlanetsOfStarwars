//modules
import React, { Component } from 'react';
import {connect} from 'react-redux';


//actions
import {addGraph,xAxisValueSelect,addGraphComponentRef,graphInteraction} from 'actions/graphs'

//components
import {Bar,BarGraph} from 'components/Graphs/components/BarGraph'
import {YAxisLabel,XAxisLabel} from 'components/Graphs/components/AxisLabels'
import {ScatterPlot} from 'components/Graphs/components/ScatterPlot'

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

  getMaxAxisValue = (data,nameOfKey) => {
    let maxValue = Math.max.apply(Math, data.map( bar => { return bar[nameOfKey]; }));
    let maxValueDigits = maxValue.toString().length;
    let largestDigit = parseInt(maxValue.toString().slice(0,1));
    let maxAxisValue = (largestDigit + 1) * Math.pow(10,maxValueDigits - 1);
    return maxAxisValue;
  }

  render() {
    //x axix
    let xAxis = {...this.props.xAxis};
    xAxis.selectedXAxisValue = this.props.graphs.graphs[this.props.graphReference] ? this.props.graphs.graphs[this.props.graphReference].optionalAxisSelectedValue : this.props.xAxis.values[0].value
    xAxis.selectedXAxisValueObject = this.props.xAxis.values.filter((value) => {return value.value == xAxis.selectedXAxisValue})[0];
    xAxis.maxXAxisValue = this.getMaxAxisValue(this.props.data,xAxis.selectedXAxisValue);

    //y axis
    let yAxis = {...this.props.yAxis};
    yAxis.selectedYAxisValueObject = this.props.yAxis.values[0];

    if(this.props.graphType == GraphTypes.SCATTER_PLOT.type) {
      const maxYValue = Math.max.apply(Math, this.props.data.map( bar => { return bar[yAxis.selectedYAxisValue]; }));
      yAxis.maxYAxisValue = this.getMaxAxisValue(this.props.data,this.props.yAxis.values[0].value);
    }

    return (
      <div className={`graph-component ${this.props.graphReference}`}  ref={(node) => this.graphContainer = node}>
        {this.props.children}
        <YAxisLabel label={yAxis.selectedYAxisValueObject.label}/>
        <div className='title'>{this.props.title}</div>
        {this.props.graphType ==  GraphTypes.BAR_GRAPH.type &&
          <BarGraph
            xAxis={xAxis}
            data={this.props.data}
            graphReference={this.props.graphReference}
            yAxis={yAxis.selectedYAxisValueObject}
            onXAxisValueSelect={(value) => this.props.xAxisValueSelect(value,this.props.graphReference)}
            setComponentRef={(node) => {this[this.props.graphReference] = node}}
            graphInteraction={this.graphInteraction}
            graphComponentRef={this[this.props.graphReference]}
          />
        }
        {this.props.graphType ==  GraphTypes.SCATTER_PLOT.type &&
          <ScatterPlot
            xAxis={xAxis}
            yAxis={yAxis}
            data={this.props.data}
            graphReference={this.props.graphReference}
            setComponentRef={(node) => {this[this.props.graphReference] = node}}
            graphComponentRef={this[this.props.graphReference]}
            graphInteraction={this.graphInteraction}
            itemTitleValue={this.props.itemTitleValue}
          />
        }
      </div>
    );
  }
}

export default connect(({planets,graphs}) => ({planets,graphs}) ,{
  addGraph,
  xAxisValueSelect,
  addGraphComponentRef,
  graphInteraction
})(Graph);
