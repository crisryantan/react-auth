import { takeEvery, call, put } from 'redux-saga/effects';
import { getRequest } from 'utils/request';
import { message } from 'antd';

import { getUsersSuccess } from './actions';
import { GET_USERS } from './constants';

export function* getUsers() {
  const requestURL = `/allUsers`;
  try {
    const { data } = yield call(getRequest, requestURL);
    yield put(getUsersSuccess(data));
  } catch ({ data }) {
    message.error(data.error.message);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(GET_USERS, getUsers);
}
