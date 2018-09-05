/*
 *
 * Register actions
 *
 */

import {
  REGISTER_ACCT,
  REGISTER_ACCT_SUCCESS,
  REGISTER_ACCT_FAILED,
} from './constants';

export function registerAcct(payload) {
  return {
    type: REGISTER_ACCT,
    payload,
  };
}

export function registerAcctSuccess(payload) {
  return {
    type: REGISTER_ACCT_SUCCESS,
    payload,
  };
}

export function registerAcctFailed(payload) {
  return {
    type: REGISTER_ACCT_FAILED,
    payload,
  };
}
