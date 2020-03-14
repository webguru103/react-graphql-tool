import * as React from 'react';
import { Formik } from 'formik';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { withDialog } from '../dialog/withDialog';
import Button from '../button/button';
import { compose, noop } from '../../utility';
import styles from './dialogButtonBottom.styles';

type DialogProps = {
  classes: Object,
  closeDialog?: Function,
  initialValues?: Object,
  onSubmit: Function,
  validate?: Function,
  actionButtonText?: React.Node,
  isButtonCancel?: boolean,
  isCloseIcon?: boolean,
  title?: React.Node,
  content: React.Element,
  canSubmit?: boolean,
  children: (any) => React.Element,
}

const DialogButtonBottomC = ({
  classes,
  closeDialog,
  initialValues,
  onSubmit,
  validate,
  actionButtonText,
  isButtonCancel,
  isCloseIcon,
  title,
  content,
  canSubmit,
  children,
}: DialogProps) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validate={validate}
    render={({
      handleSubmit, values, touched, errors, handleChange, setFieldValue, setErrors, setTouched,
    }) => (
      <form onSubmit={handleSubmit}>
        <DialogTitle classes={{ root: classes.dialogTitle }} disableTypography>
          <span>{title}</span>
          {isCloseIcon && (
            <IconButton
              classes={{ root: classes.dialogClose }}
              disableRipple
              onClick={closeDialog}
            >
              <Close />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          {content && typeof content.type === 'string' && content}
          {content && !(typeof content.type === 'string') && React.cloneElement(content, {
            values, touched, errors, handleChange, setFieldValue, setErrors, setTouched,
          })}
          {children && children({
            values, touched, errors, handleChange, setFieldValue, closeDialog, setErrors, setTouched,
          })}
        </DialogContent>
        <DialogActions
          classes={{
            root: classes.dialogActions,
            action: classes.dialogAction,
          }}
        >
          {isButtonCancel && (
            <Button
              testId="close-dialog-button-bottom"
              secondary
              onClick={closeDialog}
            >
              Cancel
            </Button>
          )
          }
          {actionButtonText
          && (
            <Button
              testId="action-dialog-button-bottom"
              primary
              type="submit"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {actionButtonText}
            </Button>
          )}
        </DialogActions>
      </form>
    )}
  />
);

DialogButtonBottomC.defaultProps = {
  isButtonCancel: true,
  isCloseIcon: true,
  closeDialog: noop,
  actionButtonText: '',
  title: '',
  initialValues: {},
  validate: () => {},
  canSubmit: true,
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withDialog,
)(DialogButtonBottomC);
