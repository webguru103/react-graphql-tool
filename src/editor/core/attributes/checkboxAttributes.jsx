import * as React from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import styles from './checkboxAttributes.styles';
import Attributes from './attributes';
import CollapsibleAttributeWrapper from './collapsibleAttributeWrapper';
import PositionSize from './positionSize';
import type { AdaptedBoolField } from '../flowTypes';
import Assignee from './assignee/assignee';
import { EDITOR_MODE } from '../../constants';
import AssigneeInstancePrep from './assignee/assigneeInstancePrep';

type Props = {
  classes: Object,
  pageIndex: string,
  handleFieldUpdate: Function,
  handleFieldClone: Function,
  handleDeleteFields: Function,
  handleFieldResize: Function,
  handleActiveSelectionMove: Function,
  disabled: boolean,
  field: AdaptedBoolField,
  getAssignees: () => Array<string>,
  pageRef: HTMLDivElement,
  zoom: number,
  mode: $Keys<typeof EDITOR_MODE>,
};

const CheckboxAttributesC = ({
  classes,
  field,
  pageIndex,
  handleFieldUpdate,
  handleFieldClone,
  handleDeleteFields,
  disabled,
  getAssignees,
  handleFieldResize,
  handleActiveSelectionMove,
  pageRef,
  zoom,
  mode,
}: Props) => (
  <Attributes
    activePageFieldId={field.id}
    pageIndex={pageIndex}
    fieldName={field.fieldName}
    fieldType={field.type}
    handleFieldUpdate={handleFieldUpdate}
    handleFieldClone={handleFieldClone}
    handleDeleteFields={handleDeleteFields}
    disabled={disabled}
    handleFieldResize={handleFieldResize}
    handleActiveSelectionMove={handleActiveSelectionMove}
  >
    <CollapsibleAttributeWrapper attributeName="Assign People">
      <div className={classNames({ [classes.assigneeSection]: mode !== EDITOR_MODE.INSTANCE_PREPARATION })}>
        <div className={classes.sectionRow}>
          {
            mode === EDITOR_MODE.INSTANCE_PREPARATION
              ? (
                <AssigneeInstancePrep
                  getAssignees={getAssignees}
                  assignee={field.assignee}
                  handleFieldUpdate={assignee => handleFieldUpdate([{ ...field, assignee, pageIndex }])}
                  disabled={disabled}
                  mode={mode}
                />
              )
              : (
                <Assignee
                  getAssignees={getAssignees}
                  assignee={field.assignee}
                  handleFieldUpdate={assignee => handleFieldUpdate([{ ...field, assignee, pageIndex }])}
                  disabled={disabled}
                  mode={mode}
                />
              )
          }
        </div>
      </div>
    </CollapsibleAttributeWrapper>
    {/* TODO: Re add when functionality is ready
    <CollapsibleAttributeWrapper attributeName="General">
      <div className={classes.generalAttributes}>
        <div className={classes.section}>
          <div className={classes.sectionRow}>
            <FormLabel className={classes.formLabel}>Checkbox Count</FormLabel>
            <Input value="1" disabled={disabled} />
          </div>
          <div className={classes.sectionRow}>
            <FormLabel className={classes.formLabel}>Max Check Limit</FormLabel>
            <Input value="1" disabled={disabled} />
          </div>
        </div>
      </div>
    </CollapsibleAttributeWrapper> */}
    <CollapsibleAttributeWrapper attributeName="Position & Sizing">
      <div className={classes.section}>
        <PositionSize
          zoom={zoom}
          pageField={field}
          handleFieldResize={handleFieldResize}
          handleActiveSelectionMove={handleActiveSelectionMove}
          disabled={disabled}
          pageRef={pageRef}
          pageIndex={pageIndex}
          handleFieldUpdate={handleFieldUpdate}
        />
      </div>
    </CollapsibleAttributeWrapper>
  </Attributes>
);

export default withStyles(styles, { withTheme: true })(CheckboxAttributesC);
