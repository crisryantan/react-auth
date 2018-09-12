/*
 *
 * Login actions
 *
 */

import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from './constants';

export function userLogin(payload) {
  return {
    type: USER_LOGIN,
    payload,
  };
}

export function userLoginSuccess(payload) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
  };
}

export function userLoginError() {
  return {
    type: USER_LOGIN_ERROR,
  };
}
