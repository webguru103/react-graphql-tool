import * as React from 'react';
import { withStyles } from '@material-ui/core';
import DatePicker from 'react-datepicker';
// $FlowFixMe
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import { EDITOR_MODE, FIELD_TYPES, DEFAULT_FONT_SIZE } from '../constants';
import styles from './date.styles';
import type { AdaptedDateField } from './flowTypes';

type PropType = {
  classes: Object,
  value: string,
  handleBlur: Function,
  handleChange: Function,
  mode: $Keys<typeof EDITOR_MODE>,
  docId: number,
  zoom: number,
  disabled: boolean,
  field: AdaptedDateField,
}

class DateC extends React.PureComponent<PropType, null> {

  componentDidUpdate(prevProps) {
    const {
      field: { assignee, dataReference }, handleBlur, handleChange, docId,
    } = this.props;
    const {
      field: { assignee: prevAssignee },
    } = prevProps;

    if (prevAssignee && assignee) {
      if (prevAssignee !== assignee) {
        handleChange('', docId, dataReference);
        handleBlur(null, docId, dataReference, { type: FIELD_TYPES.DATE });
      }
    }
  }

  render() {
    const {
      classes, value, handleChange, field, mode, docId, disabled, handleBlur, zoom,
    } = this.props;

    const viewOnly = (mode === EDITOR_MODE.INSTANCE_VIEW) || (mode === EDITOR_MODE.TEMPLATE_PUBLISHED);
    const fontSizeAdjusted = field.fontSize ? field.fontSize * zoom : DEFAULT_FONT_SIZE * zoom;

    return (
      <div
        style={{
          fontSize: fontSizeAdjusted,
        }}
      >
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={(date) => {
            handleChange(date ? date.toISOString() : '', docId, field.dataReference);
            handleBlur(date, docId, field.dataReference, { type: FIELD_TYPES.DATE });
          }}
          placeholderText="FILL DATE"
          disabled={viewOnly || disabled}
          className={classNames(classes.date, { [classes.viewOnly]: viewOnly || disabled })}
          dateFormat="yyyy-MM-dd"
        />
      </div>
    );
  }

}

export default withStyles(styles)(DateC);
