import * as React from 'react';
import { withStyles } from '@material-ui/core';
import update from 'immutability-helper';
import { withRouter } from 'react-router';
import {
  compose, hashMapByUniqueField, get,
} from '../../utility';
import styles from './formDataEditor.styles';
import type { FormData } from '../../flowTypes';
import type { Data, EditorDocument } from './flowTypes';
import { FIELD_TYPES } from '../constants';

type StateType = {
  values: {[string]: { [string]: Array<string> | string }} | {},
  initialsReferences: { [string]: number },
  signatureReferences: { [string]: number },
}

type DataFieldType = {
  [number]: {
      dataName: number,
      affectsSignature: boolean,
      required: boolean,
      valueType: number,
      value: ?string,
      id: number
    }
}

type PropType = {
  documents: Array<EditorDocument>,
  classes: Object,
  children: React.Element,
  createData: ({
      value: any,
      docId: number,
      affectsSignature: boolean,
      required: boolean,
      valueType: $Values<typeof FIELD_TYPES>
    }) => Promise<Data>,
  updateData: ({ id: number, fields: Object }) => Promise<FormData>,
  createData: ({
    value: any,
    docId: number,
    affectsSignature: boolean,
    required: boolean,
    valueType: $Values<typeof FIELD_TYPES>
  }) => Promise<Data>,
}

function flattenDataFields(documents) {
  if (!documents || documents.length < 1) {
    return {};
  }
  const valuesByDoc = {};

  documents.forEach((document) => {
    valuesByDoc[document.id] = {};
    if (!document.data.nodes || document.data.nodes.length < 1) {
      return;
    }
    valuesByDoc[document.id] = hashMapByUniqueField(document.data.nodes, 'id');
  });

  return valuesByDoc;
}

class FormDataEditorC extends React.PureComponent<PropType, StateType> {

  state = {
    values: flattenDataFields(this.props.documents),
    signatureReferences: {},
    initialsReferences: {},
  };

  changedField = null;

  componentDidUpdate(prevProps: PropType) {
    if (prevProps.documents !== this.props.documents) {
      this.setState({
        values: flattenDataFields(this.props.documents),
      });
    }
  }

  handleChange = (value: any, docId: number, dataReference: number) => {
    this.changedField = dataReference;

    this.setState((prevState) => {
      // Prevent update from attempting if values[docId][name] does not exist, which crashes the app
      if (!get(prevState.values, `${docId}.${dataReference}`, null)) {
        return null;
      }
      return {
        values: update(
          prevState.values,
          {
            [docId]: {
              [dataReference]: {
                value: {
                  data: {
                    $set: value,
                  },
                },
              },
            },
          },
        ),
      };
    });
  };

  addValues = (dataFields: DataFieldType, docId: string) => {
    this.setState(prevState => ({ values: update(prevState.values, { [docId]: { $merge: { ...dataFields } } }) }));
  };

  handleBlur = (value, docId, targetName, { type } = {}) => {
    const { updateData } = this.props;
    const { values } = this.state;

    if (this.changedField && values[docId] && values[docId][targetName]) {
      const {
        dataName, affectsSignature, required, minLen, maxLen, id, value: storedValue,
      } = values[docId][targetName];

      // if value has been explicitly passed, use it, otherwise grab from state
      const valueToUse = value || storedValue.data;

      const updateValue = {
        id,
        fields: {
          dataName,
          affectsSignature,
          required,
          minLen,
          maxLen,
          valueType: type,
          textValues: null,
          value: null,
        },
      };

      if (type === FIELD_TYPES.TEXT) {
        updateValue.fields.textValues = valueToUse;
      } else {
        updateValue.fields.value = valueToUse;
      }

      updateData(updateValue);
    }
    this.changedField = null;
  };

  handleSubmit = () => {};

  createStampsData = (docId, value, assignee, { isInitials } = { isInitials: false }) => {
    const { createData } = this.props;
    const referencesToUpdate = isInitials ? 'initialsReferences' : 'signatureReferences';

    return new Promise((res) => {
      createData({
        value,
        docId,
        affectsSignature: true,
        required: true,
        valueType: isInitials ? FIELD_TYPES.INITIAL : FIELD_TYPES.SIGNATURE,
        assignee,
      })
        .then((data) => {

          this.setState(prevState => ({
            values: update(
              prevState.values,
              {
                [docId]: {
                  [data.id]: {
                    $set: {
                      value: {
                        data: value,
                      },
                    },
                  },
                },
              },
            ),
            // also update the signature/initial references

            [referencesToUpdate]: update(
              prevState[referencesToUpdate],
              {
                [docId]: { $set: data.id },
              },
            ),
          }));

          res(data);
        });
    });
  };

  render() {
    const { classes, children } = this.props;
    const { values, signatureReferences, initialsReferences } = this.state;
    return (
      <form className={classes.form}>
        {children({
          handleChange: this.handleChange,
          handleBlur: this.handleBlur,
          addValues: this.addValues,
          createStampsData: this.createStampsData,
          values,
          signatureReferences,
          initialsReferences,
        })}
      </form>
    );
  }

}

export default compose(
  withStyles(styles),
  withRouter,
)(FormDataEditorC);
