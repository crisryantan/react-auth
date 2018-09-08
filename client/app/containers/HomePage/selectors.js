import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.get('homePage', initialState);

/**
 * Other specific selectors
 */
const makeSelectLoading = () =>
  createSelector(selectHomePageDomain, substate => substate.get('loading'));
const makeSelectUsers = () =>
  createSelector(selectHomePageDomain, substate =>
    substate.get('users').toJS(),
  );

export { makeSelectLoading, makeSelectUsers };
