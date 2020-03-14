import React from 'react';
import Select from 'react-select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core';
import styles from './addAccessForAdminDialog.styles';
import type { BrokerageType } from '../../../flowTypes';
import { noop } from '../../../utility';

type PropType = {
  classes: Object,
  values?: {[string]: Object},
  handleChange?: Function,
  errors?: { [string]: string },
  setFieldValue?: Function,
  brokerages: Array<BrokerageType>,
}

class AddAccessForAdminDialogC extends React.PureComponent<PropType> {

  static defaultProps = {
    values: {
      brokerage: {
        id: null,
        name: '',
      },
    },
    errors: {
      brokerage: '',
    },
    handleChange: noop,
    setFieldValue: noop,
  };

  render() {
    const {
      classes, values, handleChange, errors, setFieldValue, brokerages,
    } = this.props;

    return (
      <div className={classes.root}>
        {
          <React.Fragment>
            <FormControl className={classes.formControl} fullWidth error={errors && Boolean(errors.brokerage)}>
              <p>Brokerage</p>
              <Select
                options={brokerages.map(b => ({ value: b.id, label: b.brokerageName }))}
                value={values && values.brokerage}
                onChange={option => setFieldValue && setFieldValue('brokerage', option)}
                fullWidth
              />
              <FormHelperText>{errors && errors.brokerage}</FormHelperText>
            </FormControl>
            <p>Permission</p>
            <RadioGroup
              aria-label="Permission"
              name="permission"
              className={classes.group}
              value="Super Admin"
              onChange={handleChange}
            >
              <FormControlLabel value="Super Admin" control={<Radio />} label="Super Admin" />
            </RadioGroup>
          </React.Fragment>
        }
      </div>
    );
  }

}

export default withStyles(styles)(AddAccessForAdminDialogC);
