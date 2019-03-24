import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Form from './Form';
import TodoList from './TodoList'

const styles = {
    root: {
        display: 'block'
    }
}

const Todo = (props) => {
    return (
        <Grid item xs={9} md={6}>
            <Form />
            <TodoList />
        </Grid>
    )
}

export default withStyles(styles)(Todo);