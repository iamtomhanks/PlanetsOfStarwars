//constants
import {Types} from '../actions/graphs';
import {GraphSectionInteractionTypes} from 'constants/graphs'

const INITIAL_STATE = {
  graphs: {},
};

const INITIAL_GRAPH_SECTION = {
  active:false
}

export default function graphs(state = INITIAL_STATE, action) {
  switch(action.type) {
    case Types.ADD_GRAPH: {
      let graphs = {...state.graphs};
      graphs[action.payload.graph.ref] = action.payload.graph;
      return {
        graphs
      }
    }
    case Types.ADD_GRAPH_COMPONENT_REF: {
      let graphs = {...state.graphs};
      graphs[action.payload.graphReference].componentRef = action.payload.componentRef;
      return {
        graphs
      }
    }
    case Types.ADD_GRAPH_SECTION: {
      let graphs = {...state.graphs};
      if(!graphs[action.payload.graphReference].graphSections)graphs[action.payload.graphReference].graphSections = {};

      graphs[action.payload.graphReference].graphSections[action.payload.graphSectionID] = {...INITIAL_GRAPH_SECTION};

      return {
        graphs
      }
    }
    case Types.GRAPH_INTERACTION: {
      let graphs = {...state.graphs};
      let graphSection = graphs[action.payload.data.graphReference].graphSections[action.payload.data.graphSectionID];


      switch(action.payload.data.interactionType) {
        case GraphSectionInteractionTypes.SECTION_MOUSE_LEAVE:
          if(!graphSection[GraphSectionInteractionTypes.SECTION_CLICK]) {
            graphSection[GraphSectionInteractionTypes.SECTION_MOUSE_ENTER] = false;
            graphSection.active = false;
          }
          graphSection[GraphSectionInteractionTypes.SECTION_MOUSE_LEAVE] = true;
          break;
        case GraphSectionInteractionTypes.SECTION_MOUSE_ENTER:
          graphSection[GraphSectionInteractionTypes.SECTION_MOUSE_LEAVE] = false;
          graphSection.active = true;
          graphSection[GraphSectionInteractionTypes.SECTION_MOUSE_ENTER] = true;
          break;
        case GraphSectionInteractionTypes.SECTION_CLICK:
          if(graphSection.active && (graphSection[GraphSectionInteractionTypes.SECTION_CLICK])) {
            graphSection[GraphSectionInteractionTypes.SECTION_CLICK] = false;
            graphSection.active = false;
          }
          else {
            graphSection.active = true;
            graphSection[GraphSectionInteractionTypes.SECTION_CLICK] = true;
          }
          break;

          default:
          break;
      }


      return {
        graphs
      }
    }

    case Types.X_AXIS_VALUE_SELECT: {
      // console.log(action.payload)
      let graphs = {...state.graphs};
      graphs[action.payload.graphReference].optionalAxisSelectedValue = action.payload.value;
      return {
        graphs
      }
    }

    default: {
      return state;
    }
  }
}
