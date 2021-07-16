import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';

import api from '../../services/api';

import * as GetDataActions from '../actions/getData';

function* getData(action) {
  try {
    const { page } = action.payload;

    const { data } = yield call(api.get, `/api/?results=${page}`);
    console.log('data', data);

    yield put(GetDataActions.getDataSuccess(data.results));
  } catch (error) {
    console.log('error', error.response.data);
    yield put(GetDataActions.getDataFailure(error.response.data));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('GET_DATA_REQUEST', getData),
  ]);
}
