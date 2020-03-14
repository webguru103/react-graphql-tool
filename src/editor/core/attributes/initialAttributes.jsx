import * as React from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import Attributes from './attributes';
import PositionSize from './positionSize';
import styles from './initialAttributes.styles';
import CollapsibleAttributeWrapper from './collapsibleAttributeWrapper';
import Assignee from './assignee/assignee';
import type { AdaptedTextField } from '../flowTypes';
import { EDITOR_MODE } from '../../constants';
import AssigneeInstancePrep from './assignee/assigneeInstancePrep';

type Props = {
  classes: Object,
  field: AdaptedTextField,
  pageIndex: number,
  handleFieldUpdate: Function,
  handleFieldClone: Function,
  handleDeleteFields: Function,
  disabled: boolean,
  getAssignees: () => Array<string>,
  handleFieldResize: Function,
  handleActiveSelectionMove: Function,
  pageRef: HTMLDivElement,
  zoom: number,
  mode: $Keys<typeof EDITOR_MODE>,
}

const InitialAttributesC = ({
  field,
  classes,
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
    fieldName={field.fieldName}
    fieldType={field.type}
    pageIndex={pageIndex}
    handleFieldUpdate={handleFieldUpdate}
    handleFieldClone={handleFieldClone}
    handleDeleteFields={handleDeleteFields}
    disabled={disabled}
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
                  handleFieldUpdate={assignee => handleFieldUpdate([{ ...{ ...field, dataReference: -1 }, assignee, pageIndex }])}
                  disabled={disabled}
                  mode={mode}
                />
              )
              : (
                <Assignee
                  getAssignees={getAssignees}
                  assignee={field.assignee}
                  handleFieldUpdate={assignee => handleFieldUpdate([{ ...{ ...field, dataReference: -1 }, assignee, pageIndex }])}
                  disabled={disabled}
                  mode={mode}
                />
              )
          }
        </div>
      </div>
    </CollapsibleAttributeWrapper>
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

export default withStyles(styles)(InitialAttributesC);
