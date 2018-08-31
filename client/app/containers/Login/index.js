/**
 *
 * Login
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectReducer from "utils/injectReducer";
import makeSelectLogin from "./selectors";
import reducer from "./reducer";

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
  render() {
    return <div />;
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "login", reducer });

export default compose(
  withReducer,
  withConnect
)(Login);
