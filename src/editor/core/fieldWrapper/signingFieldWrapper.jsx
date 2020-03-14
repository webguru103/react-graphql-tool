import * as React from 'react';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import Field from '../field';
import styles from './signingFieldWrapper.styles';
import type {
  AdaptedBoolField, AdaptedDateField,
  AdaptedInitialField,
  AdaptedSignatureField,
  AdaptedTextField,
  Data, UpdatePageFieldInput,
} from '../flowTypes';
import type { SessionSignee } from '../../../agent-panel/api/fragments/sessionSignee';

type PropType = {
  classes: Object,
  zoom: number,
  handleBlur: Function,
  handleFieldUpdate: Function,
  handleChange: Function,
  setFieldValue: Function,
  value: Data,
  pageIndex: number,
  field: AdaptedTextField | AdaptedBoolField | AdaptedSignatureField | AdaptedInitialField | AdaptedDateField,
  pageRef: React.Element,
  mode: string,
  color: { red: number, blue: number, green: number},
  docId: number,
  assignee: string,
  mySigneeName: string,
  handleFieldRef: (ref: React.Element, id: number, dataReference: number, type: string) => void,
  signatureReferences: { [number]: number },
  initialsReferences: { [number]: number },
  createStampsData: (docId: number, value: string, ?{ isInitials: boolean }) => Promise<Data>,
  signature: string,
  initials: string,
  setStamps: ({ signature: string, initials: string }) => void,
  handleStampsFieldsUpdate: (field: UpdatePageFieldInput) => void,
  signees: Array<?SessionSignee>,
}

const didUserSign = (signees, sessionSigneeName) => {
  const signee = signees.find(s => s && s.sessionSigneeName === sessionSigneeName);

  if (signee) {
    return Boolean(signee.signedAt);
  }
  return false;
};

class FieldWrapperC extends React.PureComponent<PropType, { focused: boolean }> {

  state = {
    focused: false,
  };

  setFocus = (focused: boolean) => {
    this.setState({ focused });
  }

  render() {
    const {
      field,
      classes,
      mode,
      zoom,
      handleBlur,
      handleChange,
      value,
      mySigneeName,
      docId,
      handleFieldRef,
      signees,
      ...restProps
    } = this.props;

    const { focused } = this.state;

    // if field does not belong to me and it's value is empty, do not show it
    if ((mySigneeName !== field.assignee) && (
      !value
      || !value.value
      || !value.value.data
      || value.value.data === 'false'
      || (Array.isArray(value.value.data) && value.value.data[0] === '')
    )) {
      return null;
    }

    // if it's a date field, and user didn't sign yet, don't show it
    if (
      (mySigneeName !== field.assignee)
      && field.type === 'date'
      && !didUserSign(signees, field.assignee)
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
          [classes.myField]: (mySigneeName === field.assignee) && (field.type !== 'signature') && (field.type !== 'initial'),
          [classes.myStampField]: (mySigneeName === field.assignee) && ((field.type === 'signature') || (field.type === 'initial')),
          [classes.focused]: field.type === 'text' && focused,
        })}
        ref={r => (mySigneeName === field.assignee) && handleFieldRef(r, field.id, field.dataReference || -1, field.type)}
      >
        <Field
          {...restProps}
          docId={docId}
          handleBlur={(...args) => {
            this.setFocus(false);
            if (handleBlur) {
              handleBlur(...args);
            }
          }}
          handleChange={handleChange}
          value={value && value.value && value.value.data}
          mode={mode}
          disabled={field.assignee !== mySigneeName}
          onFocus={() => this.setFocus(true)}
          zoom={zoom}
          currentUser={mySigneeName}
          autoPopulate={field.autoPopulate ? Boolean(field.autoPopulate) : false}
          field={field}
        />
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(FieldWrapperC);
