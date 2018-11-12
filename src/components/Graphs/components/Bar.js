//modules
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Spring} from 'react-spring'

//actions
import {addGraphSection} from 'actions/graphs'

//constants
import {GraphSectionInteractionTypes} from 'constants/graphs'

//components
import {YAxisDataLabel} from 'components/Graphs/components/AxisLabels'
import {AxisIncrements} from 'components/Graphs/components/AxisIncrements'
import {GraphInteractionModal} from 'components/Graphs/components/GraphInteractionModal'
import XAxisValueSelect from 'components/Graphs/components/XAxisValueSelect'

class Bar extends Component {
  constructor(props){
    super(props);

  }

  componentWillMount() {
    this.props.addGraphSection(this.props.graphReference,this.props.id);
  }
  componentWillReceiveProps(nProps) {
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
export default connect(({graphs}) => ({graphs}) ,{addGraphSection})(Bar);


const DisplayBar = (props) => {
  const interacting = props.graphs.graphs[props.graphReference].graphSections[props.id].active;
  const graphReference = props.graphs.graphs[props.graphReference];
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
        <div
          className={`display-bar ${interacting ? 'interacting' : ''}`}
          style={{opacity, width}}
          onMouseEnter={(e) => props.graphInteraction(GraphSectionInteractionTypes.SECTION_MOUSE_ENTER,e,props.id)}
          onMouseLeave={(e) => props.graphInteraction(GraphSectionInteractionTypes.SECTION_MOUSE_LEAVE,e,props.id)}
          onClick={(e) => props.graphInteraction(GraphSectionInteractionTypes.SECTION_CLICK,e,props.id)}
        >
        {interacting &&
          <GraphInteractionModal title={props.data[props.yAxis.value]}>
            {props.xAxis.interactionText(props.data[props.xAxis.value])}
          </GraphInteractionModal>
        }
        </div>
      )}
    </Spring>
  )
}
export const BarGraph = (props) => {
  return(
    <div className="graph-inner bar-graph" ref={(node) => props.setComponentRef(node)}>
      {(props.data.length > 0) &&
        props.data.map((bar, index) => {
          return(
            <Bar
              data={bar}
              key={bar[props.yAxis.value]}
              id={bar[props.yAxis.value]}
              yAxis={props.yAxis}
              xAxis={props.xAxis.selectedXAxisValueObject}
              graphReference={props.graphReference}
              maxXAxisValue={props.xAxis.maxXAxisValue}
              graphInteraction={props.graphInteraction}
            />
          )
      })}
      <AxisIncrements
        maxValue={props.xAxis.maxXAxisValue}
        axis='x'
        graphComponentRef={props.graphComponentRef}
      />
      <XAxisValueSelect
        xAxisValues={props.xAxis.values}
        graphReference={props.graphReference}
        onChange={props.onXAxisValueSelect}
      />
    </div>
  )
}
