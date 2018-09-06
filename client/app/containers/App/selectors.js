import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the app state domain
 */

const selectAppDomain = state => state.get('app', initialState);

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(selectAppDomain, substate => substate.get('loading'));

const makeSelectAuthorized = () =>
  createSelector(selectAppDomain, substate => substate.get('authorized'));

const makeSelectUser = () =>
  createSelector(selectAppDomain, substate => substate.get('user'));

export { makeSelectLoading, makeSelectAuthorized, makeSelectUser };
