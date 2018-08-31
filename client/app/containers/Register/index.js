/**
 *
 * Register
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRegister from './selectors';
import reducer from './reducer';
import saga from './saga';

import { Form, Input } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 400px;
  margin: 40px auto;
`;

/* eslint-disable react/prefer-stateless-function */
export class Register extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <div>
          <Input />
          <Input type="password" />
        </div>
      </Wrapper>
    );
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister()
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

const withReducer = injectReducer({ key: 'register', reducer });
const withSaga = injectSaga({ key: 'register', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Register);
