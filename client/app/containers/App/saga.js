import { takeEvery, call, put, all } from 'redux-saga/effects';
import { userStateLoad, userStateDelete } from 'utils/localStorage';
import { postRequest, setToken } from 'utils/request';

import { userLoggedIn, userLogout as userLogoutAction } from './actions';
import { APP_STARTED } from './constants';

export function* getSavedUser() {
  try {
    const persistedState = yield call(userStateLoad);
    let tokenValid;

    if (persistedState) {
      tokenValid = yield call(isTokenValid, persistedState);
    }
    if (persistedState && tokenValid) {
      yield call(setToken, persistedState.token);
      yield put(userLoggedIn(persistedState));
    } else {
      yield call(userStateDelete);
      yield put(userLogoutAction());
    }
  } catch (error) {
    yield put(error);
  }
}

export function* isTokenValid(persistedState) {
  try {
    const response = yield call(postRequest, '/verifyToken', {
      token: persistedState.token,
    });

    return !!response && response.status === 200;
  } catch (exception) {
    return false;
  }
}

export function* loadStartResources() {
  yield all([call(getSavedUser)]);
}

export default function* defaultSaga() {
  yield takeEvery(APP_STARTED, loadStartResources);
}
