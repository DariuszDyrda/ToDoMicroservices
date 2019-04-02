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

class LandingPage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={12}>
                <div className={classes.root}>
                    <div>
                        <h1 className={classes.title}>It's just a simple TODO App<br></br><span className={classes.span}>by Dariusz</span></h1>
                    </div>
                    <img src={require("../resources/render.png")} alt="render" className={classes.img}></img>
                </div>
            </Grid>
        )
    }
}

export default withStyles(styles)(LandingPage);