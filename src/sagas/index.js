import PlanetsSagas from './planets';
import GraphsSagas from './graphs';
import {all} from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    ...PlanetsSagas,
    ...GraphsSagas
  ])
}
