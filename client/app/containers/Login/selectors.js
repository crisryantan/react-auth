import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the app state domain
 */

const selectLoginDomain = state => state.get('login', initialState);

/**
 * Other specific selectors
 */
const makeSelectLoading = () =>
  createSelector(selectLoginDomain, substate => substate.get('loading'));

export { makeSelectLoading };
