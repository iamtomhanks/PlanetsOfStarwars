export const Types = {
  UPDATE_ACTIVE_GRAPH: 'graphs/update_active_graph',
}

export const updateActiveGraph = (graph) => ({
  type: Types.UPDATE_ACTIVE_GRAPH,
  payload: {
    graph
  }
})
