export const Types = {
  ADD_GRAPH: 'graphs/add_graph',
  X_AXIS_VALUE_SELECT: 'graphs/x_axis_value_select',
  ADD_GRAPH_SECTION: 'graphs/add_graph_section',
  ADD_GRAPH_COMPONENT_REF: 'graphs/add_graph_component_ref',
  GRAPH_INTERACTION: 'graphs/graph_interaction',
}

export const addGraph = (graph) => ({
  type: Types.ADD_GRAPH,
  payload: {
    graph
  }
})

export const addGraphComponentRef = (graphReference, componentRef) => ({
  type: Types.ADD_GRAPH_COMPONENT_REF,
  payload: {
    graphReference,
    componentRef
  }
})

export const addGraphSection = (graphReference, graphSectionID) => ({
  type: Types.ADD_GRAPH_SECTION,
  payload: {
    graphReference,
    graphSectionID
  }
})

export const graphInteraction = (data) => ({
  type: Types.GRAPH_INTERACTION,
  payload: {
    data
  }
})

export const xAxisValueSelect = (value,graphReference) => ({
  type: Types.X_AXIS_VALUE_SELECT,
  payload: {
    value,
    graphReference
  }
})
