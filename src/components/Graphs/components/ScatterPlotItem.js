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

class ScatterPlotItem extends Component {
  constructor(props){
    super(props);

  }

  componentWillMount() {
    this.props.addGraphSection(this.props.graphReference,this.props.id);
  }
  componentWillReceiveProps(nProps) {
  }
  render() {
    const interacting = this.props.graphs.graphs[this.props.graphReference].graphSections[this.props.id].active;

    const yValue = this.props.data[this.props.yAxis.selectedYAxisValueObject.value];
    const maxYValue = this.props.yAxis.maxYAxisValue;

    const xValue = this.props.data[this.props.xAxis.selectedXAxisValueObject.value];
    const maxXValue = this.props.xAxis.maxXAxisValue;

    const graphReference = this.props.graphs.graphs[this.props.graphReference];
    let leftPosition = 0;
    let bottomPosition = 0;
    if(graphReference && graphReference.componentRef) {
      let graphWidth = graphReference.componentRef.getBoundingClientRect().width;
      let graphHeight = graphReference.componentRef.getBoundingClientRect().height;
      if(!isNaN(yValue) && !isNaN(xValue)){
        bottomPosition = (yValue / maxYValue) * this.props.graphComponentRef.getBoundingClientRect().width;
        leftPosition = (xValue / maxXValue) * this.props.graphComponentRef.getBoundingClientRect().width;
      }
    }

    return (
      <Spring
        delay={0}
        from={{opacity: 0, width: 0, height: 0,left:0, bottom: 0}}
        to={{opacity: 1, width: 25, height: 25, left:leftPosition, bottom: bottomPosition}}
      >
        {({opacity, width, height, marginLeft, left, bottom}) => (
          <div
            className={`scatter-plot-item ${interacting ? 'interacting' : ''}`}
            style={{opacity, width, height, left, bottom}}
            onMouseEnter={(e) => this.props.graphInteraction(GraphSectionInteractionTypes.SECTION_MOUSE_ENTER,e,this.props.id)}
            onMouseLeave={(e) => this.props.graphInteraction(GraphSectionInteractionTypes.SECTION_MOUSE_LEAVE,e,this.props.id)}
            onClick={(e) => this.props.graphInteraction(GraphSectionInteractionTypes.SECTION_CLICK,e,this.props.id)}
          >
          {interacting &&
            <GraphInteractionModal title={this.props.data[this.props.itemTitleValue]}>
              {this.props.xAxis.selectedXAxisValueObject.interactionText(this.props.data[this.props.xAxis.selectedXAxisValueObject.value],this.props.data[this.props.yAxis.selectedYAxisValueObject.value])}
            </GraphInteractionModal>
          }
          </div>
        )}
      </Spring>
    );
  }
}
export default connect(({graphs}) => ({graphs}) ,{addGraphSection})(ScatterPlotItem);
