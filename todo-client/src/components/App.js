import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import ButtonAppBar from './mainAppPage/ButtonAppBar';
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter, push } from 'connected-react-router'
import Login from './loginPage/Login';
import SignUp from './loginPage/SignUpPage'
import LandingPage from './LandingPage'
import Todos from './mainAppPage/Todos';

import { connect } from 'react-redux';
import { appLoad, onRedirect } from '../actions/actionTypes';
import { compose } from 'recompose';
import { store }  from '../store';


const styles = {
  App: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
}

class App extends Component {
    componentDidUpdate() {
      if(this.props.redirectTo) {
          store.dispatch(push(this.props.redirectTo));
          this.props.onRedirect();
      }
    }

  componentWillMount() {
      const token = window.localStorage.getItem('token');
      let redirectTo = token ? '/todos' : null;
      this.props.appLoad(token, redirectTo);
    }
  
  render() {
    const { classes } = this.props;

    if(this.props.appLoaded) { 
    return (
      <ConnectedRouter history={this.props.history}>
            <div className={classes.App}>
                <Grid item xs={12}>
                <ButtonAppBar token={this.props.token}/>
                </Grid>
                <Switch>
                  <Route path="/" exact component={LandingPage} />
                  <Route path="/todos" component={Todos} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={SignUp} />
                </Switch>
            </div>
            </ConnectedRouter>
    );
    }
    return (
      <div>Loading</div>
    )
  }
}

function mapStateToProps(state) {
  return state.reducer;
}

function mapDispatchToProps(dispatch) {
  return {
    appLoad: (token, redirectTo) => dispatch(appLoad(token, redirectTo)),
    onRedirect: () => dispatch(onRedirect())
  }
}

export default compose(
  withStyles(styles, {name: 'App'}),
  connect(mapStateToProps, mapDispatchToProps)
)(App);