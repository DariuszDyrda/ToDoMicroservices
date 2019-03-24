import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

import { store }  from '../../store';
import { push } from 'connected-react-router'

import { connect } from 'react-redux';
import { logout, onRedirect } from '../../actions/actionTypes';
import { compose } from 'recompose';

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: 20
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleClick() {

  }

  componentDidUpdate() {
    if(this.props.redirectTo) {
        store.dispatch(push(this.props.redirectTo));
        this.props.onRedirect();
    }
  }
  handleLogOut(e) {
    window.localStorage.removeItem('token');
    this.props.logout();
  }
  render() {
    const { classes } = this.props;
    let signInButton = null;
    let signUpButton = null;
    if(!this.props.token) {
     signInButton = (<Link to='/login' style={{textDecoration: 'none', color: 'white'}}><Button color="inherit">Sign In</Button></Link>);
     signUpButton = (<Link to='/register' style={{textDecoration: 'none', color: 'white'}}><Button color="inherit">Sign Up</Button></Link>);
    } else {
      signInButton = (<Button color="inherit" onClick={this.handleLogOut}>Logout</Button>)
    }
    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleClick}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
                TODO App
            </Typography>
              {signInButton}
              {signUpButton}
            </Toolbar>
        </AppBar>
        </div>
    );
    }
}

function mapStateToProps(state) {
  return state.reducer;
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    onRedirect: () => dispatch(onRedirect())
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {name: 'ButtonAppBar'}),
  connect(mapStateToProps, mapDispatchToProps)
)(ButtonAppBar);