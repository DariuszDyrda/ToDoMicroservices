import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import { connect } from 'react-redux';
import { addNewTodo } from '../../actions/actionTypes';
import { compose } from 'recompose';

const API_URL = 'http://localhost:8080/api/todos'

const styles = {
    root: {
        display: 'flex',
        flexGrow: 1
    },
    textField: {
        flexGrow: 1
    },
    button: {
        margin: 10,
    }
}

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        let inputVal = e.target.value;
        this.setState({inputVal});
    }
    async handleSubmit(e) {
        e.preventDefault();
        let newTodo = {task: this.state.inputVal};
        let todo = await fetch(API_URL, {
            method: "POST",
            mode: "cors",
            headers: {
                'authorization': `Bearer ${this.props.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo),
        })
        .then(data => data.json())
        .then(data => data)
        .catch(err => console.log(err));
        this.props.addNewTodo(todo);

        this.setState({inputVal: ''});
    }

    render() {
        return (
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit} className={this.props.classes.root}>
                    <TextField 
                    placeholder="What do you want to do?" 
                    onChange={this.handleChange} 
                    value={this.state.inputVal}
                    variant="outlined"
                    className={this.props.classes.textField}/>
                    <Button className={this.props.classes.button} variant="contained" type='submit' color="primary">Add</Button>
                </form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewTodo: (todo) => dispatch(addNewTodo(todo)),
    }
}

function mapStateToProps(state) {
    return state.reducer;
}

export default compose(
    withStyles(styles, {name: 'Form'}),
    connect(mapStateToProps, mapDispatchToProps)
  )(Form);