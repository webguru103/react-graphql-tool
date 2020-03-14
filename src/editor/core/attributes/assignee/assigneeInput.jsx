import React from 'react';
import Select from 'react-select';
import { withStyles } from '@material-ui/core';
import { EDITOR_MODE } from '../../../constants';

const styles = {
  select: {
    textTransform: 'capitalize',
  },
};

type PropType = {
  value: string,
  handleUpdate: (string) => void,
  classes: Object,
  disabled: boolean,
  getAssignees: () => Array<string>,
  mode: $Keys<typeof EDITOR_MODE>,
};

type StateType = {
  option: {
    value: string,
    label: string,
  },
};

class AssigneeInput extends React.Component<PropType, StateType> {

  state = {
    option: { value: this.props.value, label: this.props.value },
  };

  typedValue: string = '';

  componentDidUpdate(prevProps: PropType) {
    if (prevProps.value !== this.props.value) {
      this.setState({ option: { value: this.props.value, label: this.props.value } });
    }
  }

  componentWillUnmount() {
    const { mode } = this.props;
    if (mode === EDITOR_MODE.TEMPLATE_DRAFT && this.typedValue) {
      // ignore blur in all of the modes, except template-draft
      this.props.handleUpdate(this.typedValue);
    }
  }

  // if user selects existing option from the list
  handleSelect = (option) => {
    const { handleUpdate } = this.props;
    this.setState({ option });
    handleUpdate(option.value);
  };

  // if user types some non-existing/new option
  handleInputChange = (value) => {
    this.typedValue = value.replace(/\b\w/g, char => char.toUpperCase());
  };

  handleBlur = () => {
    const { handleUpdate, mode } = this.props;
    if (mode === EDITOR_MODE.TEMPLATE_DRAFT && this.typedValue) {
      // ignore blur in all of the modes, except template-draft
      handleUpdate(this.typedValue);
    }
  };

  render() {
    const { option } = this.state;
    const { disabled, classes, getAssignees } = this.props;

    let options = [];

    if (!disabled) {
      const assignees = getAssignees();
      options = assignees.reduce((acc, a) => [...acc, { value: a, label: a }], []);
    }

    return (
      <Select
        className={classes.select}
        value={option}
        onChange={this.handleSelect}
        onBlur={this.handleBlur}
        options={options}
        isDisabled={disabled}
        onInputChange={this.handleInputChange}
      />
    );
  }

}

export default withStyles(styles)(AssigneeInput);
