//constants
import {Types} from '../actions/app';
import {GraphReferences} from 'constants/graphs';


const INITIAL_STATE = {
  activeGraph: GraphReferences.PLANETS_BAR_GRAPH
};

export default function graphs(state = INITIAL_STATE, action) {
  switch(action.type) {
    case Types.UPDATE_ACTIVE_GRAPH: {
      return {
        activeGraph: action.payload.graph
      }
    }

    default: {
      return state;
    }
  }
}
