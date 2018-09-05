import { APP_STARTED, USER_LOGOUT, USER_LOGIN_SUCCESS } from './constants';

export function appStarted() {
  return {
    type: APP_STARTED,
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}

export function userLoggedIn(user) {
  return {
    type: USER_LOGIN_SUCCESS,
    user,
  };
}
