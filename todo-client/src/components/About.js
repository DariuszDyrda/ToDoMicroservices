import React, { Component } from 'react';
import { withStyles, Grid, Paper, List, ListItem } from '@material-ui/core'

const styles = {
    root: {
        display: 'flex',
        textAlign: 'center',
        marginTop: '30px',
        flexDirection: 'column'
      }
  }

class About extends Component {
    render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
          <Grid container direction="column" justify="flex-start" alignItems="center">
          <Grid container spacing={16} justify="center">
            <Grid item xs={9} md={12}>
              <h3>The app consists of 4 independent microservices (nginx server, API, client, database) connected using Docker-Compose.</h3>
              <h3>Deployment to AWS is done by Travis CI.</h3>
            </Grid>
          </Grid>
          <Grid container spacing={16} direction="row" justify="center" alignItems="baseline">
            <Grid item xs={9} md={3}>
              <Paper>
                <h3>Backend</h3>
                <List>
                  <ListItem>NodeJS</ListItem>
                  <ListItem>Express</ListItem>
                  <ListItem>Mongoose</ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={9} md={3}>
              <Paper>
                <h3>Frontend</h3>
                <List>
                  <ListItem>React</ListItem>
                  <ListItem>Redux</ListItem>
                  <ListItem>React Router</ListItem>
                  <ListItem>Material UI</ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={9} md={3}>
              <Paper>
                <h3>Database</h3>
                <List>
                  <ListItem>Mongo container in development</ListItem>
                  <ListItem>MongoAtlas in production</ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
          </Grid>
          </div>
        );
      }
}

export default withStyles(styles)(About);