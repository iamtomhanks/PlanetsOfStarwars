//modules
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Spring} from 'react-spring'

//actions
import {addGraphSection} from 'actions/graphs'

//constants
import {GraphSectionInteractionTypes} from 'constants/graphs'

//components
import {YAxisDataLabel} from 'components/Graphs/components/YAxisLabels'

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

const GraphInteractionModal = ({title, children}) => {
  return(
    <div className='graph-interaction-modal'>
      <div className='modal-title'>{title}</div>
      <div className='modal-data'>{children}</div>
    </div>
  )
}

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
            {props.xAxis.interationText(props.data[props.xAxis.value])}
          </GraphInteractionModal>
        }
        </div>
      )}
    </Spring>
  )
}



export default connect(({graphs}) => ({graphs}) ,{addGraphSection})(Bar);
