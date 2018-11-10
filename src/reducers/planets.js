//constants
import {Types} from '../actions/planets';

const INITIAL_STATE = {
  planets: []
};

export default function planets(state = INITIAL_STATE, action) {
  switch(action.type) {
    case Types.GET_PLANETS_SUCCESS: {
      return {
        planets: action.payload.planets
      }
    }

    default: {
      return state;
    }
  }
}
