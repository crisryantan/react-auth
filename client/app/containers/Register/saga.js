import { call, takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import { userStateSave } from 'utils/localStorage';
import { push } from 'react-router-redux';

import { postRequest } from 'utils/request';
import { getSavedUser } from 'containers/App/saga';

import { REGISTER_ACCT } from './constants';

export function* registerAcct({ payload }) {
  const requestURL = `/signup`;
  try {
    const { data } = yield call(postRequest, requestURL, payload);
    userStateSave({ token: data.token, ...data.user });
    yield call(getSavedUser);
    const redirectTo = '/';
    yield put(push(redirectTo));
  } catch ({ data }) {
    message.error(data.error.message);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* registerFlow() {
  yield takeLatest(REGISTER_ACCT, registerAcct);
}
