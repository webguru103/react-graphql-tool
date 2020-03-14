import * as React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './button.styles';

type PropType = {
  classes: Object,
  text?: string | React.Element,
  onClick: Function,
  disabled?: boolean,
  secondary?: boolean,
  fullWidth?: boolean,
  testId?: string,
  type?: string,
  testId?: string,
  children?: React.Element,
}

const ButtonC = ({
  classes, text, onClick, disabled, secondary, fullWidth, testId, type, children,
}: PropType) => (
  <Button
    className={classes.button}
    classes={{
      containedSecondary: classes.secondary,
      containedPrimary: classes.primary,
      disabled: classes.disabled,
    }}
    onClick={onClick}
    disableRipple
    color={secondary ? 'secondary' : 'primary'}
    fullWidth={fullWidth || false}
    variant="contained"
    disabled={disabled}
    data-testid={testId}
    type={type}
  >
    {text || children || null}
  </Button>
);

ButtonC.defaultProps = {
  type: 'button',
  disabled: false,
  secondary: false,
  fullWidth: false,
  children: null,
  text: '',
  testId: '',
};

export default withStyles(styles, { withTheme: true })(ButtonC);
