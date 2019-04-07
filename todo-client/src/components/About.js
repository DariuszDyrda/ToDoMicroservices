import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        height: '87vh',
    },
    img: {
        objectFit: 'contain',
        height: '90%',
        marginBottom: '70px',
    },
    title: {
        fontSize: '46px',
        marginTop: '70px',
        marginBottom: '50px',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    span: {
        fontSize: '26px',
        textTransform: 'none',
    },
  }

class About extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={12}>
                <div className={classes.root}>
                    <div>
                        <p>The whole app consists of two independent microservices. Backend is powered by NodeJs, Express and MongoDB API. Frontend has been
                            created using React alongside with Redux and React Router.
                        </p>
                    </div>
                </div>
            </Grid>
        )
    }
}

export default withStyles(styles)(About);