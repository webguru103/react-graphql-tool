import React from 'react';
import { Formik } from 'formik';
import classNames from 'classnames';
import * as yup from 'yup';
import {
  TextField, withStyles, DialogActions,
} from '@material-ui/core';
import styles from './fontTab.styles';
import { messages } from '../constants';
import Button from '../../button/button';
import validator from '../../../validation/helpers';

type Props = {
  classes: Object,
  signature: string,
  initials: string,
  onClose: () => void,
  onSubmit: () => void,
}

const shuffleArray = (a: Array<*>) => {
  const newA = a;
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // $FlowFixMe
    [newA[i], newA[j]] = [a[j], a[i]];
  }
  return newA;
};

const fontList = shuffleArray([
  'Dancing_Script', 'Pacifico', 'Cedarville_Cursive',
  'Alex_Brush', 'Allura', 'Rochester', 'Montez',
  'Zeyada', 'Over_the_Rainbow',
]);

const capitalizeString = (str: string) => str && (str.charAt(0).toUpperCase() + str.slice(1));

const fontInputValidationSchema = {
  signature: yup.string().trim().required().max(30, messages.NAME_TOO_LONG),
  initials: yup.string().trim().required().max(8, messages.INITIALS_TOO_LONG),
};

class TypeTabC extends React.PureComponent<Props, null> {

  render() {
    const {
      classes, signature, initials, onClose, onSubmit,
    } = this.props;

    return (
      <div className={classes.root}>
        <Formik
          initialValues={{
            fontOption: fontList[0],
            signature: signature || '',
            initials: initials || '',
          }}
          validate={values => validator(values, fontInputValidationSchema).errors}
          onSubmit={onSubmit}
        >
          {
            ({
              values, errors, handleSubmit, setFieldValue,
            }) => (
              <form onSubmit={handleSubmit} className={classes.fontTab}>
                <div className={classes.fontInput}>
                  <TextField
                    label="Full Name"
                    value={values.signature}
                    name="signature"
                    className={classes.signatureInput}
                    margin="normal"
                    onChange={e => setFieldValue('signature', e.target.value.slice(0, 31).split(' ').map(capitalizeString).join(' '))}
                    error={Boolean(errors.signature)}
                    // helperText={errors.signature && errors.signature}
                    inputProps={{
                      maxLength: 30,
                    }}
                  />
                  <TextField
                    name="initials"
                    label="Initials"
                    value={values.initials}
                    className={classes.initialInput}
                    margin="normal"
                    onChange={e => setFieldValue('initials', e.currentTarget.value.slice(0, 8).split().map(char => char).join(''))}
                    error={Boolean(errors.initials)}
                    // helperText={errors.initials && errors.initials}
                    inputProps={{
                      maxLength: 8,
                    }}
                  />
                </div>
                <div className={classes.fontList}>
                  {
                    fontList.map(font => (
                      <div
                        key={font}
                        tabIndex={0}
                        role="button"
                        className={classes.fontItem}
                        onClick={() => {
                          setFieldValue('fontOption', font);
                        }}
                        onKeyDown={() => {
                          setFieldValue('fontOption', font);
                        }}
                      >
                        <div
                          className={classNames({
                            [classes.dot]: true,
                            [classes.activeDot]: values.fontOption === font,
                            [classes.inActiveDot]: values.fontOption !== font,
                          })}
                        />
                        <div className={classes.signaturePreview}>
                          <span
                            id={`${font}-signature`}
                            className={classes.fullNameFonted}
                            style={{ fontFamily: `'${font.split('_').join(' ')}', cursive` }}
                          >
                            {values.signature}
                          </span>
                        </div>
                        <div className={classes.initialPreview}>
                          <span
                            id={`${font}-initials`}
                            className={classes.initialsFonted}
                            style={{ fontFamily: `'${font.split('_').join(' ')}', cursive` }}
                          >
                            {values.initials}
                          </span>
                        </div>
                      </div>
                    ))
                  }
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
      </div>
    );
  }

}

export default withStyles(styles)(TypeTabC);
