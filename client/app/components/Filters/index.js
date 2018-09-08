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
    flex-basis: 565px;
  }

  .flex-form input[type='submit'] {
    background: #ff5a5f;
    border-top: 1px solid #ff5a5f;
    border-bottom: 1px solid #ff5a5f;
    color: white;
    cursor: pointer;
  }
`;

/* eslint-disable react/prefer-stateless-function */
class Filters extends React.PureComponent {
  render() {
    return (
      <Wrapper className="cover">
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

          <input
            type="submit"
            value="Create"
            onClick={() => this.props.showUserModal({ userType: 'User' })}
          />
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
