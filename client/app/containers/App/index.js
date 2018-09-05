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
import { makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';

import Header from 'components/Header';

import HomePage from 'containers/HomePage/Loadable';
import Login from 'containers/Login/Loadable';
import Register from 'containers/Register/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { appStarted } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class App extends React.PureComponent {
  componentDidMount() {
    this.props.appStarted();
  }

  applicationRoutes = () => (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route component={NotFoundPage} />
    </Switch>
  );

  render() {
    return (
      <div>
        <Header />
        {!this.props.loading && this.applicationRoutes()}
      </div>
    );
  }
}

App.propTypes = {
  appStarted: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    appStarted: () => dispatch(appStarted())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect
  )(App)
);
