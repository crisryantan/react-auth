/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import { Card, Input } from 'antd';
import styled from 'styled-components';

import { SubmitBtn } from 'components/commonStyled';
import { makeSelectAuthorized } from 'containers/App/selectors';

import reducer from './reducer';

const Wrapper = styled.div`
  width: 500px;
  margin: 40px auto;
`;

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    if (this.props.loggedIn) {
      this.context.router.history.push('/');
    }
  }

  render() {
    return (
      <Wrapper>
        <Card title="Login Form" style={{ width: 420 }}>
          <p>
            <Input placeholder="Username" />
          </p>
          <p>
            <Input type="password" placeholder="Password" />
          </p>

          <SubmitBtn>Login</SubmitBtn>
        </Card>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectAuthorized()
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

const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withReducer,
  withConnect
)(Login);
