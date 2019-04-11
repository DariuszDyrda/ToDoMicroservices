import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter, push } from 'connected-react-router';

import ButtonAppBar from './mainAppPage/ButtonAppBar';
import Login from './loginPage/Login';
import SignUp from './loginPage/SignUpPage'
import LandingPage from './LandingPage'
import Todos from './mainAppPage/Todos';
import About from './About';
import Settings from './Settings';

import { connect } from 'react-redux';
import { appLoad, onRedirect, setSettings } from '../actions/actionTypes';
import { compose } from 'recompose';
import { store }  from '../store';

const API_URL = 'api/settings/';


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

  async componentWillMount() {
      const token = window.localStorage.getItem('token');
      let redirectTo = null;
      if(token && window.location.pathname === '/') {
        redirectTo = '/todos';
      } else {
        redirectTo = window.location.pathname;
      }
      
      await fetch(API_URL, {
        method: "GET",
          mode: "cors",
          headers: {
            'authorization': `Bearer ${token}`,
        },
      }).then(data => data.json())
      .then(data => {
        this.props.setSettings(data);
      })
      .catch(err => null);

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
                  <Route path="/about" component={About} />
                  <Route path="/settings" component={Settings} />
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
    onRedirect: () => dispatch(onRedirect()),
    setSettings: (settings) => dispatch(setSettings(settings))
  }
}

export default compose(
  withStyles(styles, {name: 'App'}),
  connect(mapStateToProps, mapDispatchToProps)
)(App);