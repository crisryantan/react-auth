/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, List } from 'antd';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import User from 'components/User';
import UserModal from 'components/UserModal';
import { makeSelectUser } from 'containers/App/selectors';

import { makeSelectLoading, makeSelectUsers } from './selectors';
import { getUsers, updateUser, deleteUser } from './actions';
import reducer from './reducer';
import saga from './saga';

const Wrapper = styled.div`
  padding: 40px;
`;

const StyledBtn = styled(Button)`
  float: right;
`;

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {

  state = {
    modalVisible: false,
    userData: {},
  }

  componentDidMount() {
    this.props.getUsers();
  }

  showUserModal = (userData) => {
    this.setState({
      userData,
      modalVisible: true,
    });
  }

  handleOk = (user) => {
    this.props.updateUser(user);
    this.setState({
      modalVisible: false,
      userData: {},
    });
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
      userData: {},
    });
  }

  render() {
    const { users, loading, currentUser } = this.props;
    const { modalVisible, userData } = this.state;
    return (
      <Wrapper>
        <StyledBtn
          type="primary"
          onClick={() => this.showUserModal({ userType: 'User' })}
        >
          Create User
        </StyledBtn>

        {modalVisible &&
          <UserModal
            visible={modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            user={userData}
          />
        }
        <List
          itemLayout="vertical"
          loading={loading}
          size="middle"
          pagination={{
            pageSize: 4,
          }}
          style={{
            margin: '0 auto',
            width: 720
          }}
          dataSource={users}
          renderItem={user => (
            <User
              key={user.title}
              user={user}
              currentUser={currentUser}
              showUserModal={this.showUserModal}
              deleteUser={this.props.deleteUser}
            />
          )}
        />
      </Wrapper>
    );
  }
}

HomePage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectUser(),
  loading: makeSelectLoading(),
  users: makeSelectUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers()),
    updateUser: (user) => dispatch(updateUser(user)),
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
