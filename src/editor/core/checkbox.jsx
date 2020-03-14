import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { EDITOR_MODE, FIELD_TYPES } from '../constants';
import styles from './checkbox.styles';
import type { AdaptedBoolField } from './flowTypes';
import Check from '../../assets/check.svg';
import CheckWhite from '../../assets/checkWhite.svg';

type PropType = {
  classes: Object,
  field: AdaptedBoolField,
  value: string,
  currentUser: string,
  handleBlur: Function,
  handleChange: (value: string, docId: number, dataReference: number) => void,
  mode: $Keys<typeof EDITOR_MODE>,
  docId: number,
  disabled: boolean,
}

class CheckboxC extends React.PureComponent<PropType, *> {

  handleClick = () => {
    const {
      value,
      docId,
      field,
      disabled,
      handleChange,
    } = this.props;

    if (disabled || !field.dataReference || !handleChange) {
      return;
    }

    const valueToStore = value === 'true' ? 'false' : 'true';
    handleChange(valueToStore, docId, field.dataReference);
  }

  handleBlur = () => {
    const {
      value,
      docId,
      field,
      disabled,
      handleBlur,
    } = this.props;

    if (disabled || !handleBlur) {
      return;
    }

    handleBlur(value, docId, String(field.dataReference), { type: FIELD_TYPES.BOOL });
  }

  render() {
    const {
      classes, value, field: { assignee }, mode, currentUser, disabled,
    } = this.props;

    const viewOnly = (mode === EDITOR_MODE.INSTANCE_VIEW) || (mode === EDITOR_MODE.TEMPLATE_PUBLISHED);
    const isSigningAndOwnField = mode === EDITOR_MODE.SIGNING && assignee === currentUser;

    return (
      <div
        data-testid="checkbox"
        onClick={this.handleClick}
        className={classNames(classes.checkbox, {
          [classes.clickable]: !viewOnly && !disabled,
        })}
        tabIndex={0}
        role="button"
        onKeyDown={this.handleClick}
        onBlur={this.handleBlur}
      >
        {value === 'false' && (
          <div className={classes.uncheckedIcon} />
        )}
        {value === 'true' && isSigningAndOwnField && (
          <React.Fragment>
            <CheckWhite className={classes.iconWhite} style={{ pointerEvents: 'none' }} />
            <div className={classes.checkedIcon} />
          </React.Fragment>
        )}
        {value === 'true' && !isSigningAndOwnField && (
          <Check />
        )}
      </div>
    );
  }

}

export default withStyles(styles)(CheckboxC);
