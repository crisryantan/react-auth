/**
 *
 * Users
 *
 */

import React from 'react';
import { List, Avatar, Icon, Tooltip, Popconfirm } from 'antd';
import styled from 'styled-components';

const StyledItem = styled(List.Item)`
  background-color: #fff;
  padding: 10px;
`;

/* eslint-disable react/prefer-stateless-function */
class User extends React.PureComponent {

  renderDisplayMode = () => {
    const { user } = this.props;
    return (
      <div>
        <List.Item.Meta
          title={<a>{user.username}</a>}
          description={user.fullname}
        />
        {user.userType}
      </div>
    )
  }

  render() {
    const { user, currentUser, showUserModal, deleteUser } = this.props;

    // disallow editing own details
    if (currentUser.username === user.username) {
      return null;
    }

    return (
      <StyledItem
        key={user.title}
        actions={[
          <Tooltip title="Edit">
            <Icon type="edit" theme="outlined" onClick={() => showUserModal(user)} />
          </Tooltip>,
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteUser(user._id)}>
            <Icon type="delete" theme="outlined" />
          </Popconfirm>
          ,
        ]}
        extra={<Avatar size={40} icon="user" />}
      >
        {this.renderDisplayMode()}
      </StyledItem>
    );
  }
}

User.propTypes = {};

export default User;
