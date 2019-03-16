import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import ButtonAppBar from './ButtonAppBar';
import Form from './Form';
import TodoList from './TodoList'

const styles = {
  App: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleSumbit(value) {
    this.setState({ value });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.App}>
        <Grid item xs={12}>
          <ButtonAppBar />
        </Grid>
        <Grid item xs={10} sm={8} md={6}>
          <Form onSubmit={this.handleSumbit}/>
          <TodoList />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
