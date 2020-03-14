import React from 'react';
import { withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import styles from './assignee.styles';
import AssigneeInput from './assigneeInput';
import { EDITOR_MODE } from '../../../constants';

const deriveAssignee = (assignee) => {
  if (!assignee) {
    return '';
  }

  if (assignee !== '*') {
    return 'specific';
  }

  return assignee;
};

type PropType = {
  assignee: string,
  getAssignees: () => Array<string>,
  handleFieldUpdate: (string) => void,
  classes: Object,
  disabled: boolean,
  mode: $Keys<typeof EDITOR_MODE>,
};

type StateType = {
  radioValue: string,
};

class AssigneeC extends React.PureComponent<PropType, StateType> {

  state = {
    radioValue: deriveAssignee(this.props.assignee),
  };

  componentDidUpdate(prevProps: PropType) {
    if (prevProps.assignee !== this.props.assignee) {
      const newRadioValue = deriveAssignee(this.props.assignee);
      this.setState({ radioValue: newRadioValue });
    }
  }

  handleRadioSwitch = (e) => {
    const { value } = e.currentTarget;
    this.setState({ radioValue: value });

    if (value !== 'specific') {
      this.props.handleFieldUpdate(value);
    }
  };

  render() {
    const {
      classes, handleFieldUpdate, assignee, getAssignees, disabled, mode,
    } = this.props;
    const { radioValue } = this.state;

    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          aria-label="Assignee"
          name="assignee"
          className={classes.group}
          value={radioValue}
          onChange={this.handleRadioSwitch}
          disabled={disabled}
        >
          <FormControlLabel
            value=""
            control={<Radio classes={{ root: classes.radioButton }} />}
            classes={{ root: classes.radioLabel }}
            label="No One"
            disabled={disabled}
          />
          <FormControlLabel
            value="*"
            control={<Radio classes={{ root: classes.radioButton }} />}
            classes={{ root: classes.radioLabel }}
            label="Everyone"
            disabled={disabled}
          />
          <FormControlLabel
            value="specific"
            control={<Radio data-testid="assignee_some" classes={{ root: classes.radioButton }} />}
            classes={{ root: classes.radioLabel }}
            disabled={disabled}
          />
        </RadioGroup>
        <AssigneeInput
          handleUpdate={handleFieldUpdate}
          disabled={radioValue !== 'specific' || disabled}
          value={(assignee !== '' && assignee !== '*') ? assignee : ''}
          getAssignees={getAssignees}
          mode={mode}
          classes={{ select: classes.assigneeInput }}
        />
      </FormControl>
    );
  }

}

export default withStyles(styles)(AssigneeC);
