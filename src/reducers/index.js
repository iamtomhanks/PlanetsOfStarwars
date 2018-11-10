import {combineReducers} from 'redux';
import PlanetsReducer from './planets';
import GraphsReducer from './graphs';
import AppReducer from './app';

export default combineReducers({
  planets: PlanetsReducer,
  graphs: GraphsReducer,
  app: AppReducer
});
