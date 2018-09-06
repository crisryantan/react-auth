import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { makeSelectAuthorized } from 'containers/App/selectors';

const PrivateRoute = props => {
  const { isLoading, component: Component, isLoggedIn, ...otherProps } = props;

  if (isLoading) {
    return null;
  }

  const authorizedContent = () => renderProps => {
    const componentWithProps = <Component {...renderProps} />;

    if (!isLoggedIn) {
      return <Redirect to={{ pathname: '/login' }} />;
    }

    return componentWithProps;
  };

  return <Route {...otherProps} render={authorizedContent()} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  render: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectAuthorized(),
});

const withConnect = connect(mapStateToProps);

export const PrivateRouteRaw = PrivateRoute;

export default compose(withConnect)(PrivateRoute);
