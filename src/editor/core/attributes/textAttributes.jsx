import * as React from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import styles from './textAttributes.styles';
import Attributes from './attributes';
import CollapsibleAttributeWrapper from './collapsibleAttributeWrapper';
import PositionSize from './positionSize';
import Assignee from './assignee/assignee';
import AssigneeInstancePrep from './assignee/assigneeInstancePrep';
import type { AdaptedTextField } from '../flowTypes';
import { EDITOR_MODE } from '../../constants';

type Props = {
  classes: Object,
  field: AdaptedTextField,
  pageIndex: number,
  handleFieldUpdate: Function,
  handleFieldClone: Function,
  handleDeleteFields: Function,
  disabled: boolean,
  handleFieldResize: Function,
  handleActiveSelectionMove: Function,
  disabled: boolean,
  pageRef: HTMLDivElement,
  getAssignees: () => Array<string>,
  zoom: number,
  mode: $Keys<typeof EDITOR_MODE>,
};

const TextAttributesC = ({
  classes,
  field,
  pageIndex,
  handleFieldUpdate,
  handleFieldClone,
  handleDeleteFields,
  disabled,
  getAssignees,
  handleActiveSelectionMove,
  handleFieldResize,
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

    <CollapsibleAttributeWrapper attributeName="Position & Sizing">
      <div className={classes.section}>
        <PositionSize
          pageField={field}
          handleFieldResize={handleFieldResize}
          handleActiveSelectionMove={handleActiveSelectionMove}
          disabled={disabled}
          pageRef={pageRef}
          pageIndex={pageIndex}
          handleFieldUpdate={handleFieldUpdate}
          zoom={zoom}
        />
      </div>
    </CollapsibleAttributeWrapper>
  </Attributes>
);

export default withStyles(styles, { withTheme: true })(TextAttributesC);
