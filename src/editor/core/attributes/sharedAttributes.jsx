import * as React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import styles from './sharedAttributes.styles';

type PropType = {
  classes: Object,
  children: React.Node,
  fieldIds: Array<number>,
  handleFieldClone: Function,
  handleDeleteFields: Function,
  disabled: boolean,
};

type StateType = {
  activePageFieldId: number,
  fieldName: string,
};

class SharedAttributesC extends React.PureComponent<PropType, StateType> {

  render() {
    const {
      classes,
      children,
      fieldIds,
      handleFieldClone,
      handleDeleteFields,
      disabled,
    } = this.props;

    return (
      <React.Fragment>
        <div className={classes.header}>
          <div className={classes.headerTitle}>
            {
              fieldIds.length && fieldIds.length > 1 && `${fieldIds.length} fields selected`
            }
          </div>
          <div className={classes.headerIcons}>
            <IconButton className={classes.editIcon} onClick={() => handleFieldClone()} disabled={disabled}>
              <FileCopyIcon />
            </IconButton>
            <IconButton className={classes.editIcon} onClick={() => handleDeleteFields([fieldIds])} disabled={disabled}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className={classes.content}>
          {children}
        </div>
      </React.Fragment>
    );
  }

}

export default withStyles(styles, { withTheme: true })(SharedAttributesC);
