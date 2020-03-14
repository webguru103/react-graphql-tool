import React from 'react';
import {
  Drawer, withStyles, List, ListItem,
} from '@material-ui/core';
import type { Match } from 'react-router';
import { Link } from 'react-router-dom';
import Signature from './signature.showcase';

const styles = () => ({
  layout: {
    height: '100%',
    width: '100%',
  },
  drawer: {
    width: 200,
  },
  content: {
    paddingLeft: 200,
  },
});

const Layout = ({ children, classes }) => (
  <div
    className={classes.layout}
  >
    <Drawer
      variant="persistent"
      anchor="left"
      open
      className={classes.drawer}
    >
      <List>
        <ListItem>
          <Link to="/showcase/signaturetool">Signature Tool</Link>
        </ListItem>
        <ListItem>
          <Link to="/showcase/placeholder">Placeholder</Link>
        </ListItem>
      </List>
    </Drawer>
    <div className={classes.content}>
      {children}
    </div>
  </div>
);

const StyledLayout = withStyles(styles)(Layout);

const ShowCase = ({ match: { params: { component } } }: { match: Match}) => {
  switch (component) {
    case 'signaturetool':
      return (<StyledLayout><Signature /></StyledLayout>);
    case 'placeholder':
      return (<StyledLayout>Placeholder</StyledLayout>);
    default:
      return (<StyledLayout>Components Library</StyledLayout>);
  }
};

export default ShowCase;
