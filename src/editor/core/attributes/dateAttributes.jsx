import * as React from 'react';
import { withStyles, FormLabel, Checkbox } from '@material-ui/core';
import styles from './dateAttributes.styles';
import Attributes from './attributes';
import CollapsibleAttributeWrapper from './collapsibleAttributeWrapper';
import PositionSize from './positionSize';
import Assignee from './assignee/assignee';
import AssigneeInstancePrep from './assignee/assigneeInstancePrep';
import type { AdaptedDateField } from '../flowTypes';
import { EDITOR_MODE } from '../../constants';

type Props = {
  classes: Object,
  field: AdaptedDateField,
  pageIndex: number,
  handleFieldUpdate: Function,
  handleFieldClone: Function,
  handleDeleteFields: Function,
  disabled: boolean,
  handleActiveSelectionMove: Function,
  disabled: boolean,
  pageRef: HTMLDivElement,
  getAssignees: () => Array<string>,
  zoom: number,
  mode: $Keys<typeof EDITOR_MODE>,
};

class DateAttributesC extends React.PureComponent<Props, null> {

  handleAutoPopulateToggle = () => {
    const { field: { autoPopulate, id, type }, pageIndex, handleFieldUpdate } = this.props;

    handleFieldUpdate(
      [{
        id,
        autoPopulate: !autoPopulate,
        type,
        pageIndex,
      }],
    );

  };

  render() {
    const {
      classes,
      field,
      pageIndex,
      handleFieldUpdate,
      handleFieldClone,
      handleDeleteFields,
      disabled,
      getAssignees,
      handleActiveSelectionMove,
      pageRef,
      zoom,
      mode,
    } = this.props;

    return (
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
        <CollapsibleAttributeWrapper attributeName="Assignment for signing session">
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
        </CollapsibleAttributeWrapper>

        <CollapsibleAttributeWrapper attributeName="Position">
          <div className={classes.section}>
            <PositionSize
              pageField={field}
              handleActiveSelectionMove={handleActiveSelectionMove}
              disabled={disabled}
              pageRef={pageRef}
              pageIndex={pageIndex}
              handleFieldUpdate={handleFieldUpdate}
              zoom={zoom}
              disableSize
            />
          </div>
        </CollapsibleAttributeWrapper>

        <CollapsibleAttributeWrapper attributeName="Auto Population">
          <div className={classes.section}>
            <div className={classes.autoPopulate}>
              <Checkbox
                checked={field.autoPopulate}
                disabled={disabled}
                onChange={this.handleAutoPopulateToggle}
                name="toggleAutoPopulate"
                className={classes.autoPopulateCheckbox}
              />
              <FormLabel classes={{ root: classes.autoPopulateLabel }}>Autopopulate with signing date</FormLabel>
            </div>
          </div>
        </CollapsibleAttributeWrapper>
      </Attributes>
    );
  }

}

export default withStyles(styles, { withTheme: true })(DateAttributesC);
