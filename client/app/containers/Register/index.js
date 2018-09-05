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

import { SubmitBtn } from 'components/commonStyled';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRegister from './selectors';
import reducer from './reducer';
import saga from './saga';

import { registerAcct } from './actions';

import { Card, Input, Select } from 'antd';
import styled from 'styled-components';

const Option = Select.Option;
const Wrapper = styled.div`
  width: 500px;
  margin: 40px auto;
`;

const cardWidth = { width: 420 };

/* eslint-disable react/prefer-stateless-function */
export class Register extends React.PureComponent {
  state = {
    form: {
      username: '',
      password: '',
      fullname: '',
      userType: 'User'
    }
  };

  updateField = (value, key) => {
    this.setState({
      form: {
        ...this.state.form,
        [key]: value
      }
    });
  };

  registerUser = () => {
    this.props.registerAcct(this.state.form);
  };

  render() {
    return (
      <Wrapper>
        <Card title="Register Form" style={cardWidth}>
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
          <p>
            <Input
              placeholder="Fullname"
              onChange={e => this.updateField(e.target.value, 'fullname')}
            />
          </p>
          <Select
            defaultValue="User"
            onChange={value => this.updateField(value, 'userType')}
            style={{ width: '100%' }}
          >
            <Option value="User">User</Option>
            <Option value="Admin">Admin</Option>
          </Select>
          <SubmitBtn onClick={this.registerUser}>Register</SubmitBtn>
        </Card>
      </Wrapper>
    );
  }
}

Register.propTypes = {
  registerAcct: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister()
});

function mapDispatchToProps(dispatch) {
  return {
    registerAcct: payload => dispatch(registerAcct(payload))
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
