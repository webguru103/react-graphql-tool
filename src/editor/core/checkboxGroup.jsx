import * as React from 'react';
import type { AdaptedBoolField } from './flowTypes';
import FieldWrapper from './fieldWrapper/fieldWrapper';

type StateType = {
  partialValues: Array<{id: number, value: boolean}>
};

type PropType = {
  fields: Array<AdaptedBoolField>,
  setFieldValue: Function,
  fieldId: string,
  handleBlur: Function,
  value: Array<boolean>,
  zoom: number,
  activePageFieldId: string,
  activeSelectionPageFields: Array<number>,
  handleActiveSelectionRemove: Function,
  handleActiveSelectionClear: Function,
  handleFieldResize: Function,
  pageId: string,
  pageRef: React.Element,
  offsetHeight: number,
  offsetWidth: number,
  resizingId: ?string,
  addFieldToSelection: Function,
  dragging: boolean,
}

class CheckboxGroup extends React.PureComponent<PropType, StateType> {

  constructor(props: PropType) {
    super(props);
    const values = props.fields.reduce((acc, field) => [
      ...acc, {
        id: field.id,
        // $FlowFixMe TODO outdated
        value: field.groupIndex ? props.value[field.groupIndex] : false,
      },
    ], []);
    // $FlowFixMe TODO outdated
    this.state = { partialValues: values };
  }

  state = {
    partialValues: [],
  };

  getFieldValue = (fieldId: number) => {
    const pValues = this.state.partialValues.filter(value => value.id === fieldId);
    return pValues.length ? pValues[0].value : undefined;
  };

  handleChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const { setFieldValue, fieldId } = this.props;
    const idxToUpdate = this.state.partialValues.findIndex(pValue => pValue.id === name);
    const newValues = [...this.state.partialValues]; // eslint-disable-line
    newValues[idxToUpdate] = { ...newValues[idxToUpdate], value: e.currentTarget.checked };
    this.setState({ partialValues: newValues });
    setFieldValue(fieldId, newValues.reduce((acc, value) => [...acc, value.value], []));
  };

  handleBlur = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const fullValue = this.state.partialValues.reduce((acc, pValue) => [...acc, pValue.value], []);
    const originalName = e.currentTarget.name;
    e.currentTarget.name = this.props.fieldId;
    this.props.handleBlur(e, fullValue);
    e.currentTarget.name = originalName;
  };

  render(): Array<React.Element> {
    const {
      fields,
      zoom,
      activePageFieldId,
      activeSelectionPageFields,
      addFieldToSelection,
      handleActiveSelectionRemove,
      handleActiveSelectionClear,
      handleFieldResize,
      pageId,
      pageRef,
      offsetHeight,
      offsetWidth,
      resizingId,
      dragging,
    } = this.props;
    return (
      fields.map(field => (
        <FieldWrapper
          dragging={dragging}
          offsetHeight={field.id === resizingId ? offsetHeight : null}
          offsetWidth={field.id === resizingId ? offsetWidth : null}
          resizingId={field.id === resizingId ? resizingId : null}
          key={field.id}
          id={field.id}
          fieldId={field.id}
          pageId={pageId}
          pageRef={pageRef}
          left={field.x}
          top={field.y}
          width={field.width}
          height={field.height}
          currentActivePageField={activePageFieldId === field.id}
          inActiveSelection={activeSelectionPageFields.includes(field.id)}
          addFieldToSelection={addFieldToSelection}
          handleActiveSelectionRemove={handleActiveSelectionRemove}
          handleActiveSelectionClear={handleActiveSelectionClear}
          handleFieldResize={handleFieldResize}
          name={field.fieldName}
          field={field}
          zoom={zoom}
          handleBlur={this.handleBlur}
          handleChange={this.handleChange}
          value={this.getFieldValue(field.id)}
          outsideClickIgnoreClass="fieldOutClick"
          disableOnClickOutside={!activeSelectionPageFields.includes(field.id) && activePageFieldId !== field.id}
        />
      ))
    );
  }

}

export default CheckboxGroup;
