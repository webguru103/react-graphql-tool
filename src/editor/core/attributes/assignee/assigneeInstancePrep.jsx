import React from 'react';
import { withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import styles from './assigneeInstancePrep.styles';
import AssigneeInput from './assigneeInput';
import { EDITOR_MODE } from '../../../constants';

type PropType = {
  assignee: string,
  getAssignees: () => Array<string>,
  handleFieldUpdate: (string) => void,
  classes: Object,
  mode: $Keys<typeof EDITOR_MODE>,
};

type StateType = {
  radioValue: string,
};

class AssigneeC extends React.PureComponent<PropType, StateType> {

  render() {
    const {
      classes, handleFieldUpdate, assignee, getAssignees, mode,
    } = this.props;

    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <AssigneeInput
          handleUpdate={handleFieldUpdate}
          value={assignee}
          getAssignees={getAssignees}
          mode={mode}
          classes={{ select: classes.assigneeInput }}
        />
      </FormControl>
    );
  }

}

export default withStyles(styles)(AssigneeC);
