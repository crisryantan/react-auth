import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the register state domain
 */

const selectRegisterDomain = state => state.get("register", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Register
 */

const makeSelectRegister = () =>
  createSelector(selectRegisterDomain, substate => substate.toJS());

export default makeSelectRegister;
export { selectRegisterDomain };
