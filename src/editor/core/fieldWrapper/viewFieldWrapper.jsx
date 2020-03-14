import * as React from 'react';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import Field from '../field';
import styles from './signingFieldWrapper.styles';
import type {
  AdaptedBoolField,
  AdaptedInitialField,
  AdaptedSignatureField,
  AdaptedTextField,
  Data,
} from '../flowTypes';

type PropType = {
  classes: Object,
  zoom: number,
  value: Data,
  pageIndex: number,
  field: AdaptedTextField | AdaptedBoolField | AdaptedSignatureField | AdaptedInitialField,
  mode: string,
  color: { red: string, blue: string, green: string},
  docId: number,
}

class ViewFieldWrapperC extends React.PureComponent<PropType, { focused: boolean }> {

  render() {
    const {
      field,
      classes,
      mode,
      zoom,
      value,
      pageIndex,
      docId,
    } = this.props;

    // if field doesn't have value, do not show it
    if (
      !value
      || !value.value
      || !value.value.data
      || value.value.data === 'false'
      || (Array.isArray(value.value.data) && value.value.data[0] === '')
    ) {
      return null;
    }

    return (
      <div
        style={{
          left: field.x ? field.x * zoom : 0,
          top: field.y ? field.y * zoom : 0,
          height: field.height ? field.height * zoom : 0,
          width: field.width ? field.width * zoom : 0,
        }}
        key={field.id}
        data-testid="fieldWrapper"
        className={classnames({
          [classes.field]: true,
        })}
      >
        <Field
          docId={docId}
          zoom={zoom}
          pageIndex={pageIndex}
          value={value && value.value && value.value.data}
          mode={mode}
          field={field}
        />
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(ViewFieldWrapperC);
