/**
 *
 * Header
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavWrapper = styled.nav`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  li {
    flex: 1;
    border: 1px solid black;
  }

  a {
    color: #3d9fe0;
    font-weight: 100;
    letter-spacing: 2px;
    text-decoration: none;
    padding: 20px 5px;
    display: inline-block;
    width: 100%;
    text-align: center;
    transition: all 0.5s;
  }

  a:hover {
    background-color: #0c3c63;
  }
`;

/* eslint-disable jsx-a11y/anchor-is-valid */

function Header(props) {
  return (
    <NavWrapper>
      <ul>
        <li>
          <Link to="/">HomePage</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li onClick={props.userLogout}>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </NavWrapper>
  );
}

Header.propTypes = {};

export default Header;
