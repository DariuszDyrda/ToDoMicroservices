import React, { Component } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import { setSettings, redirectUnauthorizedAccess, onRedirect } from '../actions/actionTypes'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { store } from '../store';
import { push } from 'connected-react-router';

const API_URL = '/api/settings';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    }
}

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dontShowCompletedTasks: null
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidUpdate() {
        if(this.props.redirectTo) {
            store.dispatch(push(this.props.redirectTo));
            this.props.onRedirect();
        }
      }
    componentWillMount() {
        if(this.props.token) {
            let value = this.props.settings.dontShowCompletedTasks;
            this.setState({dontShowCompletedTasks: value});
        }
    }
    async handleChange() {
        let value = !this.state.dontShowCompletedTasks;
        let settings = {dontShowCompletedTasks: value};
        await fetch(API_URL, {
            method: "PUT",
            mode: "cors",
            headers: {
                'authorization': `Bearer ${this.props.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(settings),
        })
        .then(data => data.json())
        .then(data => {
            this.setState({dontShowCompletedTasks: value});
            this.props.setSettings(data);
        })
        .catch(err => console.log(err));
    }
    render() {
        const { classes } = this.props;
        if(!this.props.token) {
            this.props.redirectUnauthorizedAccess('/login');
        }
        return (
            <div className={classes.root}>
                <FormGroup row>
                    <FormControlLabel
                    control={
                        <Switch
                        checked={this.state.dontShowCompletedTasks}
                        onChange={this.handleChange}
                        value=""
                        />
                    }
                    label="Don't show completed tasks"
                    />
                </FormGroup>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSettings: (settings) => dispatch(setSettings(settings)),
        onRedirect: () => dispatch(onRedirect()),
        redirectUnauthorizedAccess: (redirectTo) => dispatch(redirectUnauthorizedAccess(redirectTo))
    }
  }
  
  function mapStateToProps(state) {
    return state.reducer;
  }

export default compose(
    withStyles(styles, {name: 'Settings'}),
    connect(mapStateToProps, mapDispatchToProps)
  )(Settings);