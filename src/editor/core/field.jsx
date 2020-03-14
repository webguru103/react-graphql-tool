import * as React from 'react';
import StampField from './stampField/stampField';
import TextBox from './textbox';
import Date from './date';
import Checkbox from './checkbox';
import { EDITOR_MODE } from '../constants';
import type {
  Data,
  UpdatePageFieldInput,
  AdaptedBoolField,
  AdaptedTextField,
  AdaptedSignatureField,
  AdaptedInitialField,
  AdaptedDateField, AdaptedField,
} from './flowTypes';

type PropType = {
  zoom: number,
  handleBlur?: Function,
  handleChange?: Function,
  value: any,
  pageRef?: React.Element,
  pageIndex: number,
  handleFieldResize?: (id: number, width: number, height: number, pageIndex: number) => void,
  withRef?: Function,
  mode: string,
  handleSelectedFieldsDuplicate?: Function,
  dragging?: boolean,
  docId: number,
  disabled?: boolean,
  onFocus?: () => void,
  signatureReferences?: { [number]: number },
  initialsReferences?: { [number]: number },
  createStampsData?: (docId: number, value: string, ?{ isInitials: boolean }) => Promise<Data>,
  setStamps?: ({ signature: string, initials: string }) => void,
  handleStampsFieldsSign?: (field: UpdatePageFieldInput) => void,
  wipe?: (fieldId: number, pageIndex: number, docId: number) => void,
  currentUser?: string,
  color?: { red: number, green: number, blue: number },
  field: AdaptedTextField | AdaptedBoolField | AdaptedSignatureField | AdaptedInitialField | AdaptedDateField,
  signed?: number,
  createUserStamps?: (userSignature: { stamp: string }, userInitial: { stamp: string }) => Promise<void>,
  handleFieldsUpdate?: (Array<AdaptedField>, { sign: boolean }) => void,
  handleFieldsDelete?: (Array<number>) => void,
  setFocus?: (focus: boolean) => void,
}

class FieldC extends React.PureComponent<PropType, null> {

  render() {
    const {
      zoom,
      handleBlur,
      handleChange,
      value,
      handleStampsFieldsSign,
      pageRef,
      pageIndex,
      handleFieldResize,
      handleSelectedFieldsDuplicate,
      withRef,
      mode,
      dragging,
      docId,
      disabled,
      onFocus,
      signatureReferences,
      initialsReferences,
      createStampsData,
      setStamps,
      wipe,
      currentUser,
      field,
      signed,
      createUserStamps,
      handleFieldsUpdate,
      handleFieldsDelete,
      setFocus,
    } = this.props;
    switch (field.type) {
      case ('signature'): {
        return (
          <StampField
            field={field}
            handleStampsFieldsSign={handleStampsFieldsSign}
            mode={mode}
            disabled={disabled || (mode === EDITOR_MODE.TEMPLATE_PUBLISHED)}
            value={value}
            dataReference={signatureReferences && signatureReferences[docId]}
            createStampsData={createStampsData}
            docId={docId}
            pageIndex={pageIndex}
            setStamps={setStamps}
            wipe={wipe}
            currentUser={currentUser}
            zoom={zoom}
            signed={signed}
            createUserStamps={createUserStamps}
            handleFieldsUpdate={handleFieldsUpdate}
            handleFieldsDelete={handleFieldsDelete}
          />
        );
      }
      case ('initial'): {
        return (
          <StampField
            field={field}
            handleStampsFieldsSign={handleStampsFieldsSign}
            mode={mode}
            disabled={disabled || (mode === EDITOR_MODE.TEMPLATE_PUBLISHED)}
            value={value}
            dataReference={initialsReferences && initialsReferences[docId]}
            createStampsData={createStampsData}
            docId={docId}
            pageIndex={pageIndex}
            setStamps={setStamps}
            wipe={wipe}
            currentUser={currentUser}
            zoom={zoom}
            signed={signed}
            createUserStamps={createUserStamps}
            handleFieldsUpdate={handleFieldsUpdate}
            handleFieldsDelete={handleFieldsDelete}
          />
        );
      }
      case ('checkbox'): {
        return (
          <Checkbox
            field={field}
            docId={docId}
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={value}
            mode={mode}
            currentUser={currentUser}
            disabled={disabled || (mode === EDITOR_MODE.TEMPLATE_PUBLISHED)}
          />
        );
      }
      case ('date'): {
        return (
          <Date
            docId={docId}
            handleBlur={handleBlur}
            handleChange={handleChange}
            field={field}
            value={value}
            mode={mode}
            disabled={disabled || currentUser !== field.assignee}
            zoom={zoom}
          />
        );
      }
      default: {
        return (
          <TextBox
            dragging={dragging}
            docId={docId}
            zoom={zoom}
            handleBlur={handleBlur}
            handleChange={handleChange}
            setFieldValue={handleChange}
            value={value}
            pageRef={pageRef}
            pageIndex={pageIndex}
            handleFieldResize={handleFieldResize}
            withRef={withRef}
            disabled={disabled || (mode === EDITOR_MODE.TEMPLATE_PUBLISHED)}
            handleSelectedFieldsDuplicate={handleSelectedFieldsDuplicate}
            onFocus={onFocus}
            mode={mode}
            field={field}
            setFocus={setFocus}
          />
        );
      }
    }
  }

}

export default FieldC;
