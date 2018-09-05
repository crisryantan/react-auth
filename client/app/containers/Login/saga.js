import { call, takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import { userStateSave } from 'utils/localStorage';
import { push } from 'react-router-redux';

import { postRequest } from 'utils/request';
import { getSavedUser } from 'containers/App/saga';

import { USER_LOGIN } from './constants';
import { userLoginError } from './actions';

export function* loginAcct({ payload }) {
  const requestURL = `/login`;
  try {
    const { data } = yield call(postRequest, requestURL, payload);
    userStateSave({ token: data.token, ...data.user });
    yield call(getSavedUser);
    const redirectTo = '/';
    yield put(push(redirectTo));
  } catch ({ data }) {
    yield put(userLoginError());
    message.error(data.error.message);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginFlow() {
  yield takeLatest(USER_LOGIN, loginAcct);
}
