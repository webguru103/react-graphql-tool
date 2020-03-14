import React from 'react';
import {
  withStyles, FormControl, FormHelperText, DialogActions,
} from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import SignaturePad from './signaturePad';
import styles from './drawTab.styles';
import validator from '../../../validation/helpers';
import { messages } from '../constants';
import Button from '../../button/button';

type Props = {
  classes: Object,
  onClose: () => void,
  onSubmit: () => void,
}

const drawInputValidationSchema = {
  signature: yup.string().required(messages.DRAW_SIGNATURE),
  initials: yup.string().required(messages.DRAW_INITIALS),
};

class DrawTabC extends React.PureComponent<Props, null> {

  render() {
    const {
      classes, onClose, onSubmit,
    } = this.props;
    return (
      <Formik
        initialValues={{
          initials: '',
          signature: '',
        }}
        validate={values => validator(values, drawInputValidationSchema).errors}
        onSubmit={onSubmit}
      >
        {
          ({
            values, errors, handleSubmit, setFieldValue, touched,
          }) => (
            <form onSubmit={handleSubmit} className={classes.drawTab}>
              <div className={classes.pads}>
                <FormControl className={classes.pad}>
                  <SignaturePad
                    width={432}
                    height={108}
                    text={messages.DRAW_SIGNATURE_HERE}
                    name="signature"
                    onDrawEnd={(name, dataURL) => {
                      setFieldValue(name, dataURL);
                    }}
                    onClear={() => {
                      setFieldValue('signature', '');
                    }}
                    dataURL={values.signature}
                  />
                  <FormHelperText error={Boolean(touched.signature && errors.signature)}>
                    {touched.signature && errors.signature}
                  </FormHelperText>
                </FormControl>
                <FormControl className={classes.pad}>
                  <SignaturePad
                    width={144}
                    height={108}
                    text={messages.DRAW_INITIAL_HERE}
                    name="initials"
                    onDrawEnd={(name, dataURL) => {
                      setFieldValue(name, dataURL);
                    }}
                    onClear={() => {
                      setFieldValue('initials', '');
                    }}
                    dataURL={values.initials}
                  />
                  <FormHelperText error={Boolean(touched.initials && errors.initials)}>
                    {touched.initials && errors.initials}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className={classes.disclaimer}>
                {messages.DISCLAIMER({
                  link1: (
                    <a
                      href="https://dealtap.ca/legal"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DealTap&apos;s Terms of Service and the DealTap Compliance & E-Signing Overview
                    </a>),
                })}
              </div>
              <DialogActions
                classes={{
                  root: classes.dialogActions,
                  action: classes.dialogAction,
                }}
              >
                <Button
                  onClick={() => onClose()}
                  secondary
                  classes={{
                    button: classes.actionButtons,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  classes={{
                    button: classes.actionButtons,
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </form>
          )
        }
      </Formik>
    );
  }

}

export default withStyles(styles, { withTheme: true })(DrawTabC);
