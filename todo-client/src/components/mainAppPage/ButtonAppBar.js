import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
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
  list: {
    width: 250
  }
};

class ButtonAppBar extends Component {
  constructor(props) {
      super(props);
      this.state = {
        drawer: false
      }
      this.handleLogOut = this.handleLogOut.bind(this);
  }
  toggleDrawer = (open) => () => {
    this.setState({drawer: open});
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

    let iconButton = window.location.pathname === '/settings' ? 
      (<IconButton className={classes.menuButton} color="inherit" aria-label="Back">
        <Link to='/todos' style={{textDecoration: 'none', color: 'white'}}><ArrowBack /></Link>
      </IconButton>) : 
      (<IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>)

    let signInButton = null;
    let signUpButton = null;
    let settingsItem = null;
    if(!this.props.token) {
     signInButton = (<Link to='/login' style={{textDecoration: 'none', color: 'white'}}><Button color="inherit">Sign In</Button></Link>);
     signUpButton = (<Link to='/register' style={{textDecoration: 'none', color: 'white'}}><Button color="inherit">Sign Up</Button></Link>);
     settingsItem = null;
    } else {
      signInButton = (<Button color="inherit" onClick={this.handleLogOut}>Logout</Button>)
      settingsItem = (<Link to='/settings' style={{textDecoration: 'none', color: 'white'}}><ListItem button key={"Settings"}><ListItemText primary={"Settings"} /></ListItem></Link>)
    }

    const sideList = (
      <div className={classes.list}>
        <List>
          <Link to='/about' style={{textDecoration: 'none', color: 'white'}}>
            <ListItem button key={"About"}>
            <ListItemText primary={"About"} />
            </ListItem>
          </Link>
            {settingsItem}
        </List>
      </div>
    );

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            {iconButton}
            <Drawer open={this.state.drawer} onClose={this.toggleDrawer(false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
              >
                {sideList}
              </div>
            </Drawer>
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