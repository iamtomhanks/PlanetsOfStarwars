import {takeEvery, call, fork, put} from 'redux-saga/effects';
import * as actions from '../actions/planets';
import * as api from '../api/planets'

function* getPlanets() {
  try{
    const result = yield call(api.getPlanets);
    yield put(actions.getPlanetsSuccess({
      planets: result.data.results
    }));
  }catch(e){

  }
}

function* watchGetPlanetsRequest() {
 yield takeEvery(actions.Types.GET_PLANETS_REQUEST, getPlanets);
}

const planetSagas = [
  fork(watchGetPlanetsRequest)
]

export default planetSagas;
