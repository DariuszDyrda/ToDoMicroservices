import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';

import { store } from '../../store';
import { push } from 'connected-react-router';

import { login } from '../../actions/actionTypes'
import { connect } from 'react-redux';
import { compose } from 'recompose';

const LOGIN_URL = 'http://localhost:8080/api/login'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {

  _isMounted = false;

    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        open: false,
        message: ''
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    componentDidUpdate() {
      if(this.props.redirectTo) {
          store.dispatch(push(this.props.redirectTo));
          this.props.onRedirect();
      }
    }

    handleClose() {
      this.setState({open: false});
    }

    async handleSubmit(e) {
      e.preventDefault();

        let credentials = {username: this.state.email, password: this.state.password};
        await fetch(LOGIN_URL, {
          method: 'POST',
          mode: "cors",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        .then(data => data.json())
        .then(user => {
          if(!user.token) {
            throw new Error("Incorrect username or password")
          }
            window.localStorage.setItem('token', user.token);
            this.props.login(user);
        })
        .catch(err => {
          this.setState({open: true, message: err.message})
        });
    }

    handleChange(e) {
      e.preventDefault();
      if(this._isMounted) {
        let change = e.target.value;
        if(e.target.id === 'email') {
          this.setState({email: change});
        } else if(e.target.id === 'password') {
          this.setState({password: change});
        }
    }
    }
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" name="email" autoComplete="email" onChange={this.handleChange} autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign in
                </Button>
                </form>
            </Paper>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{this.state.message}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
            </main>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return {
      login: (user) => dispatch(login(user)),
  }
}

function mapStateToProps(state) {
  return state;
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {name: 'Login'}),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
