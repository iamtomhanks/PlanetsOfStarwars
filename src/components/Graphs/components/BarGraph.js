//modules
import React, { Component } from 'react';

//actions
import {addGraphSection} from 'actions/graphs'

//components
import {YAxisDataLabel} from 'components/Graphs/components/AxisLabels'
import {AxisIncrements} from 'components/Graphs/components/AxisIncrements'
import XAxisValueSelect from 'components/Graphs/components/XAxisValueSelect'
import Bar from 'components/Graphs/components/Bar'

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
