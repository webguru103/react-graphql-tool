import * as React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { withStyles } from '@material-ui/core';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import styles from './collapsibleAttributeWrapper.styles';

type PropType = {
  attributeName: string,
  children: React.Element,
  classes: Object,
};

type StateType = {
  expanded: boolean,
}

class CollapsibleAttributeWrapperC extends React.Component<PropType, StateType> {

  state = {
    expanded: true,
  };

  handleExpand = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

  render() {
    const { expanded } = this.state;

    const { attributeName, children, classes } = this.props;
    return (
      <ExpansionPanel
        expanded={expanded}
        CollapseProps={{ classes: { container: classNames(classes.panel, { [classes.panelExpanded]: expanded }) } }}
        onChange={this.handleExpand}
        elevation={0}
      >
        <ExpansionPanelSummary
          classes={{
            root: classes.root, expanded: classes.expanded, content: classes.content, expandIcon: classes.expandIcon,
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.attributeName}>{attributeName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetails }}>
          {children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

}

export default withStyles(styles)(CollapsibleAttributeWrapperC);
