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
import injectSaga from 'utils/injectSaga';

import { Card, Input } from 'antd';
import styled from 'styled-components';

import { SubmitBtn } from 'components/commonStyled';
import { makeSelectAuthorized } from 'containers/App/selectors';

import saga from './saga';
import reducer from './reducer';
import { userLogin } from './actions';
import { makeSelectLoading } from './selectors';

const Wrapper = styled.div`
  width: 500px;
  margin: 40px auto;
`;

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.loggedIn) {
      this.context.router.history.push('/');
    }
  }

  updateField = (value, key) => {
    this.setState({
      [key]: value,
    });
  };

  loginUser = () => {
    const { username, password } = this.state;
    this.props.userLogin({ username, password });
  };

  render() {
    const { loading } = this.props;
    return (
      <Wrapper>
        <Card title="Login Form" style={{ width: 420 }}>
          <p>
            <Input
              placeholder="Username"
              onChange={e => this.updateField(e.target.value, 'username')}
            />
          </p>
          <p>
            <Input
              type="password"
              placeholder="Password"
              onChange={e => this.updateField(e.target.value, 'password')}
            />
          </p>

          <SubmitBtn onClick={this.loginUser} loading={loading}>
            Login
          </SubmitBtn>
        </Card>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectAuthorized(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    userLogin: payload => dispatch(userLogin(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'login', saga });
const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
