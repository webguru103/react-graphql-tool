import * as React from 'react';
import { InputBase, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '../../../assets/trash.svg';
import CopyIcon from '../../../assets/copy.svg';
import styles from './attributes.styles';

type PropType = {
  classes: Object,
  fieldName: string,
  fieldType: string,
  children: React.Node,
  activePageFieldId: number,
  pageIndex: number,
  handleFieldUpdate: Function,
  handleFieldClone: Function,
  handleDeleteFields: Function,
  disabled: boolean,
};

type StateType = {
  activePageFieldId: number,
  fieldName: string,
};

class AttributesC extends React.PureComponent<PropType, StateType> {

  state = {
    activePageFieldId: this.props.activePageFieldId,
    fieldName: this.props.fieldName || '',
  };

  componentWillUnmount() {
    const { fieldType, pageIndex, handleFieldUpdate } = this.props;
    const { activePageFieldId } = this.state;

    // This is to ensure that any updates to field name is saved when clicking outside of the panel and field blur is not triggered
    // If the props field name is different from the state field name, new name has not been saved.
    if (this.props.fieldName !== this.state.fieldName) {
      handleFieldUpdate([
        {
          id: activePageFieldId,
          fieldName: this.state.fieldName,
          type: fieldType,
          pageIndex,
        },
      ]);
    }
  }

  updateFieldName = (ev: SyntheticEvent<HTMLInputElement>) => {
    const { value } = ev.currentTarget;

    this.setState({
      fieldName: value,
    });
  };

  render() {
    const {
      classes,
      children,
      activePageFieldId,
      fieldType,
      pageIndex,
      handleFieldUpdate,
      handleFieldClone,
      handleDeleteFields,
      disabled,
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>
            <InputBase
              id="fieldName"
              fullWidth
              onChange={ev => this.updateFieldName(ev)}
              className={classes.headerTitleInput}
              onBlur={() => {
                if (this.props.fieldName !== this.state.fieldName) {
                  handleFieldUpdate([
                    {
                      id: activePageFieldId,
                      fieldName: this.state.fieldName,
                      type: fieldType,
                      pageIndex,
                    },
                  ]);
                }
              }}
              value={this.state.fieldName}
              disabled={disabled}
            />
          </div>
          <div className={classes.headerIcons}>
            <IconButton className={classes.editIcon} onClick={() => handleFieldClone()} disabled={disabled} data-testid="cloneField">
              <CopyIcon />
            </IconButton>
            <IconButton className={classes.editIcon} onClick={() => handleDeleteFields()} disabled={disabled} data-testid="deleteField">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(AttributesC);
