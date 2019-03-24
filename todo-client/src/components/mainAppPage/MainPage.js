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

class MainPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.App}>
        <Grid item xs={12}>
          <ButtonAppBar />
        </Grid>
        <Grid item xs={10} sm={8} md={6}>
          <Form />
          <TodoList />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MainPage);
