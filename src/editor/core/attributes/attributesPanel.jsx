import * as React from 'react';
import { withStyles } from '@material-ui/core';
import TextAttributes from './textAttributes';
import DateAttributes from './dateAttributes';
import CheckboxAttributes from './checkboxAttributes';
import SignatureAttributes from './signatureAttributes';
import InitialAttributes from './initialAttributes';
import LineAttributes from './lineAttributes';
import DefaultAttributes from './defaultAttributes';
import styles from './attributesPanel.styles';
import { EDITOR_MODE } from '../../constants';
import type { AdaptedPage } from '../flowTypes';
import { isDefined } from '../../../utility';
import SharedAttributes from './sharedAttributes';
import type { SessionSignee } from '../../../agent-panel/api/fragments/sessionSignee';

type Props = {
  classes: Object,
  handleFieldClone: Function,
  handleDeleteFields: Function,
  handleFieldUpdate: Function,
  handleLineFieldUpdate: Function,
  pageRefs: Array<React.Element>,
  mode: string,
  handleFieldResize: Function,
  zoom: number,
  handleActiveSelectionMove: Function,
  pages: Array<AdaptedPage>,
  activeSelectionPageFields: Array<number>,
  signees: Array<?SessionSignee>,
};

export class AttributePanelC extends React.PureComponent<Props, null> {

  getAssignees = (): Array<string> => {
    const { mode, pages, signees } = this.props;
    let assignees = [];

    if (mode === EDITOR_MODE.TEMPLATE_DRAFT) {
      // in this mode, get the assignees from field.assignee
      const fields = pages.reduce((acc, page) => ({ ...acc, ...page.fields }), {});
      // $FlowFixMe object values
      const allAssignees = Object.values(fields).reduce((acc, field) => [...acc, field.assignee], []);

      // leave only unique assignees
      assignees = Array.from(new Set(allAssignees))
        .filter(a => (a !== '*' && a !== '' && isDefined(a)));
    }

    if (mode === EDITOR_MODE.INSTANCE_PREPARATION) {
      // in this mode, get the available assignees from the list of passed signees.
      assignees = signees.map(s => (s && s.sessionSigneeName ? s.sessionSigneeName : ''));
    }

    return assignees;
  };

  render() {
    const {
      classes,
      handleFieldClone,
      handleDeleteFields,
      handleFieldUpdate,
      handleLineFieldUpdate,
      pageRefs,
      mode,
      handleFieldResize,
      handleActiveSelectionMove,
      pages,
      activeSelectionPageFields,
      zoom,
    } = this.props;

    const disabled = mode === EDITOR_MODE.TEMPLATE_PUBLISHED;
    const selectText = (mode === EDITOR_MODE.TEMPLATE_DRAFT ? 'Select a field to view/edit its attributes' : 'Select a field to view its attributes');

    if (!activeSelectionPageFields.length) {
      return <div className={classes.noSelection} data-testid="no-selection-message">{selectText}</div>;
    }

    if (activeSelectionPageFields.length > 1) {
      return (
        <SharedAttributes
          fieldIds={activeSelectionPageFields}
          handleFieldUpdate={handleFieldUpdate}
          handleFieldClone={handleFieldClone}
          handleDeleteFields={handleDeleteFields}
          disabled={disabled}
          handleFieldResize={handleFieldResize}
          handleActiveSelectionMove={handleActiveSelectionMove}
        />
      );
    }

    let activeField = null;

    if (Array.isArray(pages) && activeSelectionPageFields.length === 1) {
      const fields = pages.reduce((acc, page) => ({ ...acc, ...page.fields }), {});
      activeField = fields[activeSelectionPageFields[0]];
    }

    if (activeField) {
      const { type, pageIndex } = activeField;

      const pageRef = pageRefs[pageIndex];

      switch (type) {
        case 'text': {
          return (
            <TextAttributes
              zoom={zoom}
              field={activeField}
              pageIndex={pageIndex}
              handleFieldUpdate={handleFieldUpdate}
              pageRef={pageRef}
              handleFieldClone={handleFieldClone}
              handleDeleteFields={handleDeleteFields}
              disabled={disabled}
              getAssignees={this.getAssignees}
              handleFieldResize={handleFieldResize}
              handleActiveSelectionMove={handleActiveSelectionMove}
              key={activeField.id}
              mode={mode}
            />
          );
        }
        case 'date': {
          return (
            <DateAttributes
              zoom={zoom}
              field={activeField}
              pageIndex={pageIndex}
              handleFieldUpdate={handleFieldUpdate}
              pageRef={pageRef}
              handleFieldClone={handleFieldClone}
              handleDeleteFields={handleDeleteFields}
              disabled={disabled}
              getAssignees={this.getAssignees}
              handleActiveSelectionMove={handleActiveSelectionMove}
              key={activeField.id}
              mode={mode}
            />
          );
        }
        case 'checkbox': {
          return (
            <CheckboxAttributes
              zoom={zoom}
              field={activeField}
              pageIndex={pageIndex}
              pageRef={pageRef}
              handleFieldUpdate={handleFieldUpdate}
              handleFieldClone={handleFieldClone}
              handleDeleteFields={handleDeleteFields}
              disabled={disabled}
              getAssignees={this.getAssignees}
              handleFieldResize={handleFieldResize}
              handleActiveSelectionMove={handleActiveSelectionMove}
              key={activeField.id}
              mode={mode}
            />
          );
        }
        case 'signature': {
          return (
            <SignatureAttributes
              zoom={zoom}
              field={activeField}
              pageIndex={pageIndex}
              pageRef={pageRef}
              handleFieldUpdate={handleFieldUpdate}
              handleFieldClone={handleFieldClone}
              handleDeleteFields={handleDeleteFields}
              disabled={disabled}
              getAssignees={this.getAssignees}
              handleFieldResize={handleFieldResize}
              handleActiveSelectionMove={handleActiveSelectionMove}
              key={activeField.id}
              mode={mode}
            />
          );
        }
        case 'initial': {
          return (
            <InitialAttributes
              zoom={zoom}
              field={activeField}
              pageIndex={pageIndex}
              pageRef={pageRef}
              handleFieldUpdate={handleFieldUpdate}
              handleFieldClone={handleFieldClone}
              handleDeleteFields={handleDeleteFields}
              disabled={disabled}
              getAssignees={this.getAssignees}
              handleFieldResize={handleFieldResize}
              handleActiveSelectionMove={handleActiveSelectionMove}
              key={activeField.id}
              mode={mode}
            />
          );
        }
        case 'line': {
          return (
            <LineAttributes
              zoom={zoom}
              field={activeField}
              handleLineFieldUpdate={handleLineFieldUpdate}
              pageRef={pageRef}
              pageIndex={pageIndex}
              handleFieldUpdate={handleFieldUpdate}
              handleFieldClone={handleFieldClone}
              handleDeleteFields={handleDeleteFields}
              disabled={disabled}
              key={activeField.id}
              mode={mode}
            />
          );
        }
        default: {
          return (
            <DefaultAttributes
              field={activeField}
              pageIndex={pageIndex}
              handleFieldUpdate={handleFieldUpdate}
              handleFieldClone={handleFieldClone}
              handleDeleteFields={handleDeleteFields}
              disabled={disabled}
              key={activeField.id}
              mode={mode}
            />
          );
        }
      }
    }
    return null;

  }

}

export default withStyles(styles)(AttributePanelC);
