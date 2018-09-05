import { call, takeLatest, put } from 'redux-saga/effects';
import { REGISTER_ACCT } from './constants';
import { message } from 'antd';
import { userStateSave } from 'utils/localStorage';
import { push } from 'react-router-redux';

import { postRequest } from 'utils/request';

export function* registerAcct({ payload }) {
  const requestURL = `/signup`;
  try {
    const { data } = yield call(postRequest, requestURL, payload);
    userStateSave({ token: data.token, ...data.user });
    let redirectTo = '/';
    yield put(push(redirectTo));
  } catch (err) {
    message.error(data.error.message);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* registerFlow() {
  yield takeLatest(REGISTER_ACCT, registerAcct);
}
