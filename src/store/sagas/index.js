import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';

import api from '../../services/api';

import * as GetDataActions from '../actions/getData';

function* getData() {
  try {
    const data = action.payload;
    const random = yield call(api.get, '/api');

    console.log(random);
  } catch (error) {
    console.log('error', error.response);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('GET_DATA_REQUEST', getData),
  ]);
}
