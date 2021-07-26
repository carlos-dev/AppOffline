import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';

import api from '../../services/api';

import * as GetDataActions from '../actions/getData';
import * as GetDetailsActions from '../actions/getDetails';

/**
 * function that makes an API request and returns an array of data
 * @param {Object}
 */
function* getData(action) {
  try {
    const { results, page } = action.payload;

    const { data } = yield call(api.get, `/api/?page=${page}&results=${results}`);

    yield put(GetDataActions.getDataSuccess(data.results));
  } catch (error) {
    console.log('error', error.response.data);
    yield put(GetDataActions.getDataFailure(error.response.data));
  }
}

/**
 * function that makes an API request and returns an array with the details
 * @param {Object}
 */
function* getDetails(action) {
  try {
    const { user } = action.payload;

    const { data } = yield call(api.get, `/api/?username=${user}`);

    yield put(GetDetailsActions.getDetailsSuccess(data.results));
  } catch (error) {
    console.log('error', error.response.data);
    yield put(GetDetailsActions.getDetailsFailure(error.response.data));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('GET_DATA_REQUEST', getData),
    takeLatest('GET_DETAILS_REQUEST', getDetails),
  ]);
}
