//modules
import React from 'react'

//components
import ScatterPlotItem from 'components/Graphs/components/ScatterPlotItem'
import {AxisIncrements} from 'components/Graphs/components/AxisIncrements'
import {YAxisLabel,XAxisLabel} from 'components/Graphs/components/AxisLabels'

export const ScatterPlot = (props) => {
  return(
    <div className="graph-inner scatter-plot" ref={(node) => props.setComponentRef(node)}>
      <AxisIncrements
        maxValue={props.yAxis.maxYAxisValue}
        axis='y'
        graphComponentRef={props.graphComponentRef}
      />
      {(props.data.length > 0) &&

        props.data.map((bar, index) => {
          return(
            <ScatterPlotItem
              data={bar}
              key={bar[props.yAxis.selectedYAxisValueObject.value]}
              id={bar[props.yAxis.selectedYAxisValueObject.value]}
              yAxis={props.yAxis}
              xAxis={props.xAxis}
              graphReference={props.graphReference}
              graphInteraction={props.graphInteraction}
              graphComponentRef={props.graphComponentRef}
              itemTitleValue={props.itemTitleValue}
            />
          )
      })}
      <AxisIncrements
        maxValue={props.xAxis.maxXAxisValue}
        axis='x'
        graphComponentRef={props.graphComponentRef}
      />
    <XAxisLabel label={props.xAxis.selectedXAxisValueObject.label}/>
    </div>
  )
}
