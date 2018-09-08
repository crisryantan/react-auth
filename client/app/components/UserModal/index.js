/**
 *
 * UserModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Modal } from 'antd';
const { Option } = Select;

/* eslint-disable react/prefer-stateless-function no-underscore-dangle */
class UserModal extends React.PureComponent {
  state = {
    ...this.props.user,
  };

  updateField = (value, key) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { onOk, onCancel } = this.props;
    const { _id, username, fullname, userType, password } = this.state;

    return (
      <Modal
        title="User Information"
        visible
        onOk={() => onOk(this.state)}
        onCancel={onCancel}
      >
        <p>
          <Input
            placeholder="Username"
            defaultValue={username}
            disabled={_id && true}
            onChange={e => this.updateField(e.target.value, 'username')}
          />
        </p>
        {!_id && (
          <p>
            <Input
              type="password"
              defaultValue={password}
              placeholder="Password"
              onChange={e => this.updateField(e.target.value, 'password')}
            />
          </p>
        )}
        <p>
          <Input
            placeholder="Fullname"
            defaultValue={fullname}
            onChange={e => this.updateField(e.target.value, 'fullname')}
          />
        </p>
        <Select
          defaultValue={userType}
          onChange={value => this.updateField(value, 'userType')}
          style={{ width: '100%' }}
        >
          <Option value="User">User</Option>
          <Option value="Admin">Admin</Option>
        </Select>
      </Modal>
    );
  }
}

UserModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserModal;
