import * as React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './textButton.styles';

type PropType = {
  classes: Object,
  text?: string | React.Element,
  onClick: Function,
  disabled?: boolean,
  secondary?: boolean,
  testId?: string,
  type?: string,
  children?: React.Element,
}

const TextButtonC = ({
  classes, text, onClick, disabled, secondary, testId, type, children,
}: PropType) => (
  <Button
    className={classes.button}
    classes={{
      textPrimary: classes.primary,
      textSecondary: classes.secondary,
      disabled: classes.disabled,
    }}
    onClick={onClick}
    disableRipple
    color={secondary ? 'secondary' : 'primary'}
    disabled={disabled}
    type={type}
    variant="text"
    data-testid={testId}
  >
    {text || children || null}
  </Button>
);

TextButtonC.defaultProps = {
  type: 'button',
  disabled: false,
  secondary: false,
  children: null,
  text: '',
  testId: '',
};

export default withStyles(styles, { withTheme: true })(TextButtonC);
