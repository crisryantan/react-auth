import { takeEvery, call, put } from 'redux-saga/effects';
import { putRequest, getRequest, deleteRequest } from 'utils/request';
import { message } from 'antd';

import { registerAcct } from 'containers/Register/saga';

import { getUsersSuccess } from './actions';
import { GET_USERS, UPDATE_USERS, DELETE_USERS } from './constants';

export function* getUsers() {
  const requestURL = `/allUsers`;
  try {
    const { data } = yield call(getRequest, requestURL);
    yield put(getUsersSuccess(data));
  } catch ({ data }) {
    message.error(data.error.message);
  }
}

export function* updateUser({ user }) {
  const requestURL = `/user/update/${user._id}`;
  try {
    if (user._id) {
      yield call(putRequest, requestURL, user);
      yield call(getUsers);
      message.success('Successfully updated user.')
    } else {
      yield call(registerAcct, { payload: user, adminCreate: true })
    }
  } catch ({ data }) {
    message.error(data.error.message);
  }
}

export function* deleteUser({ id }) {
  const requestURL = `/user/${id}`;
  try {
    yield call(deleteRequest, requestURL);
    yield call(getUsers);
    message.success('Successfully deleted user.')
  } catch ({ data }) {
    message.error(data.error.message);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(GET_USERS, getUsers);
  yield takeEvery(UPDATE_USERS, updateUser);
  yield takeEvery(DELETE_USERS, deleteUser);
}
