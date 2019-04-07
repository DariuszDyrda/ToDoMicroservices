import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { login, register, setSettings } from '../../actions/actionTypes'
import { connect } from 'react-redux';
import { compose } from 'recompose';

const REGISTER_URL = `/api/register`

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

class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        confirmPassword: '',
        open: false,
        message: ''
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
    async handleSubmit(e) {
      e.preventDefault();
      let credentials = {username: this.state.email, password: this.state.password};
      await fetch(REGISTER_URL, {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      .then(data => data.json())
      .then(user => {
        if(user.errors && user.errors.username.name === "ValidatorError") {
          throw new Error("There's already a user with given username")
        }
        if(this.state.password !== this.state.confirmPassword) {
          throw new Error("Confirmation password doesn't match the password")
      }
        if(!user.token) {
          throw new Error("Failed to register")
        }
        this.props.setSettings(user.settings);
        this.props.register(user);
        window.localStorage.setItem('token', user.token);
      })
      .catch(err => {
        this.setState({open: true, message: err.message})
      });
    }

    handleClose() {
      this.setState({open: false});
    }

    handleChange(e) {
      e.preventDefault();
      let change = e.target.value;
      if(e.target.id === 'email') {
        this.setState({email: change});
      } else if(e.target.id === 'password') {
        this.setState({password: change});
      } else if(e.target.id === 'confirmPassword') {
          this.setState({confirmPassword: change});
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
                Sign up
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
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                    <Input name="confirmPassword" type="password" id="confirmPassword" onChange={this.handleChange} />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign up
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
      register: (user) => dispatch(register(user)),
      setSettings: (settings) => dispatch(setSettings(settings))
  }
}

function mapStateToProps(state) {
  return state.reducer;
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {name: 'SignUp'}),
  connect(mapStateToProps, mapDispatchToProps)
)(SignUp);
