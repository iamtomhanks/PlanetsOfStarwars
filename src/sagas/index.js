import PlanetsSagas from './planets';
import {all} from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    ...PlanetsSagas
  ])
}
