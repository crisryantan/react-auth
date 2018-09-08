import { call, takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import { userStateSave } from 'utils/localStorage';
import { push } from 'react-router-redux';

import { postRequest } from 'utils/request';
import { getSavedUser } from 'containers/App/saga';
import { getUsers } from 'containers/HomePage/saga';

import { REGISTER_ACCT } from './constants';

export function* registerAcct({ payload, adminCreate }) {
  const requestURL = `/signup`;
  try {
    const { data } = yield call(postRequest, requestURL, payload);
    if (adminCreate) {
      // if admin created, call getUser to refresh list
      yield call(getUsers);
      message.success('Successfully created user.');
    } else {
      // if user created, redirect user to homepage
      userStateSave({ token: data.token, ...data.user });
      yield call(getSavedUser);
      const redirectTo = '/';
      yield put(push(redirectTo));
      message.success('Successfully signed up user.');
    }
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
