import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

const styles = {

  }

class LandingPage extends Component {
    render() {
        return (
            <Grid item xs={12}>
                <p>This is landing page!</p>
            </Grid>
        )
    }
}

export default withStyles(styles)(LandingPage);