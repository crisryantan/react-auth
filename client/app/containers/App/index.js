/**
 *
 * App
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import PrivateRoute from 'router/PrivateRoute';

import Header from 'components/Header';
import HomePage from 'containers/HomePage/Loadable';
import Login from 'containers/Login/Loadable';
import Register from 'containers/Register/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { appStarted } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class App extends React.PureComponent {
  componentDidMount() {
    this.props.appStarted();
  }

  applicationRoutes = isLoading => (
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} isLoading={isLoading} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route component={NotFoundPage} />
    </Switch>
  );

  render() {
    const { loading } = this.props;
    return (
      <div>
        <Header />
        {!loading && this.applicationRoutes(loading)}
      </div>
    );
  }
}

App.propTypes = {
  appStarted: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    appStarted: () => dispatch(appStarted()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(App),
);
