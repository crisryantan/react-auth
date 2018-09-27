/**
 *
 * Filters
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 720px;
  margin: 0 auto 20px;

  .flex-form > * {
    border: 0;
    padding: 5px;
    background: white;
    line-height: 50px;
    font-size: 20px;
    border-radius: 0;
    outline: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
  }

  .flex-form > *:last-child {
    border-right: 0;
  }

  .flex-form {
    z-index: 10;
    border: 10px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    display: flex;
  }

  input[type='search'] {
    flex-basis: 620px;
    padding-left: 20px;
    background-color: #4c4c4c;
    color: #fff;
  }

  .form-btn-wrapper {
    text-align: right;
  }

  .open-form-btn {
    background: #ff5a5f;
    color: white;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 10px;
    height: 50px;
    width: 95px;
    font-weight: 900;
  }
`;

/* eslint-disable react/prefer-stateless-function */
class Filters extends React.PureComponent {
  render() {
    return (
      <Wrapper className="cover">
        <div className="form-btn-wrapper">
          <input
            className="open-form-btn"
            type="submit"
            value="Create"
            onClick={() => this.props.showUserModal({ userType: 'User' })}
          />
        </div>
        <div className="flex-form">
          <input
            type="search"
            onChange={e => this.props.updateFilter('keyword', e.target.value)}
            placeholder="Search username"
          />

          <select
            onChange={e => this.props.updateFilter('userType', e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
      </Wrapper>
    );
  }
}

Filters.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  showUserModal: PropTypes.func.isRequired,
};

export default Filters;
