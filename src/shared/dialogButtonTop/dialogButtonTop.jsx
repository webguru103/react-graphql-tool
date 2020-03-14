import * as React from 'react';
import { Formik } from 'formik';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './dialogButtonTop.styles';
import { compose, noop } from '../../utility';
import { withDialog } from '../dialog/withDialog';

type DialogProps = {
  classes: Object,
  closeDialog?: Function,
  initialValues?: Object,
  onSubmit: Function,
  validate?: Function,
  actionButtonText?: React.Node,
  isButtonCancel?: boolean,
  title?: React.Node,
  content: React.Element,
}

const DialogButtonTopC = ({
  classes,
  initialValues,
  onSubmit,
  validate,
  actionButtonText,
  isButtonCancel,
  closeDialog,
  title,
  content,
}: DialogProps) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validate={validate}
    render={({
      handleSubmit, values, errors, handleChange,
    }) => (
      <form onSubmit={handleSubmit}>
        <DialogTitle classes={{ root: classes.dialogTitle }} disableTypography>
          {isButtonCancel
            && (
            <IconButton
              classes={{ root: classes.dialogClose }}
              disableRipple
              onClick={closeDialog}
            >
              <Close />
            </IconButton>
            )
          }
          <span>{title}</span>
          <Button classes={{ root: classes.dialogAction }} type="submit">{actionButtonText || null}</Button>
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          {React.cloneElement(content, { values, errors, handleChange })}
        </DialogContent>
      </form>
    )}
  />
);

DialogButtonTopC.defaultProps = {
  isButtonCancel: true,
  closeDialog: noop,
  actionButtonText: '',
  title: '',
  initialValues: {},
  validate: noop,
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withDialog,
)(DialogButtonTopC);
