import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { makeSelectAuthorized } from 'containers/App/selectors';

const PrivateRoute = props => {
  const {
    isLoading,
    component: Component,
    render: Render,
    isLoggedIn,
    computedMatch,
    ...otherProps
  } = props;

  if (isLoading) {
    return null;
  }

  const authorizedContent = () => renderProps => {
    const componentWithProps = Render ? (
      <Render {...renderProps} />
    ) : (
      <Component {...renderProps} />
    );
    const { stepName } = computedMatch.params;

    if (!isLoggedIn) {
      return <Redirect to={{ pathname: '/login' }} />;
    }

    if (!stepName) {
      return componentWithProps;
    }

    return componentWithProps;
  };

  return <Route {...otherProps} render={authorizedContent()} />;
};

PrivateRoute.propTypes = {
  computedMatch: PropTypes.shape({
    params: PropTypes.shape({
      stepName: PropTypes.string,
    }),
  }),
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
