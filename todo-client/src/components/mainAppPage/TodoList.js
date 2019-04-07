import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import { loadTodos, toggleCheck, deleteTodo } from '../../actions/actionTypes';
import { compose } from 'recompose';

const API_URL = `/api/todos/`

const styles = theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
  });

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }

    async handleToggle(value) {
      const url = API_URL + value._id;
      let checked = !(value.completed);
      let todo = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${this.props.token}`,
        },
        body:JSON.stringify({"completed": checked.toString()}), // body data type must match "Content-Type" header
      })
      .then(data =>  data.json())
      .then(todo => todo)
      .catch(err => console.log(err));

      this.props.toggleCheck(todo);
      };

    async handleDelete(value) {
        const url = API_URL + value._id;
        let deletedTodo = await fetch(url, {
          method: "DELETE",
          mode: "cors",
          headers: {
            'authorization': `Bearer ${this.props.token}`,
        },
        })
        .then(data => data.json())
        .then(data => data)
        .catch(err => console.log(err));

        this.props.deleteTodo(deletedTodo);
      }


    async componentWillMount() {
      if(this.props.token) {
        await fetch(API_URL, {
          mode: 'cors',
          headers: {
            'authorization': `Bearer ${this.props.token}`
          }
        })
          .then(data => data.json())
          .then(data => {
            this.props.loadTodos(data);
          })
          .catch(err => console.log(err));
      }
      }

    render() {
        const { classes } = this.props;
        if(!this.props.token) {
          return (
            <div>LOADING... TodoList</div>
          )
        }
        return (
            <List className={classes.root}>
              {this.props.todos
              .filter(task => {
                if(this.props.settings.dontShowCompletedTasks) {
                  return task.completed === false;
                }
                return task;
              })
              .map(value => (
                <div key={value._id} style={{display: 'flex'}}>
                <ListItem role={undefined} button
                  onClick={this.handleToggle.bind(this, value)}>
                  <Checkbox
                    checked={value.completed}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={value.task} />
                </ListItem>
                <DeleteIcon button className={classes.icon} onClick={this.handleDelete.bind(this, value)}/>
                </div>
              ))}
            </List>
        );
      }
}

function mapDispatchToProps(dispatch) {
    return {
        loadTodos: (todos) => dispatch(loadTodos(todos)),
        toggleCheck: (todo) => dispatch(toggleCheck(todo)),
        deleteTodo: (todo) => dispatch(deleteTodo(todo)),
    }
}
function mapStateToProps(state) {
    return state.reducer;
}

export default compose(
    withStyles(styles, {name: 'TodoList'}),
    connect(mapStateToProps, mapDispatchToProps)
  )(TodoList);