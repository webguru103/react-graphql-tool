import * as React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './snackbarProvider.styles';
import { SnackbarContext } from './snackbarContext';
import { compose } from '../../utility';

type Props = {
  children: React.Element,
  classes: Object,
}

type VerticalPositionType = "top" | "center" | "bottom" | number;
type HorizontalPositionType = "left" | "center" | "right" | number;

type StateType = {
  isSnackbarOpen: boolean,
  snackbarContent: React.Element,
  verticalPosition: VerticalPositionType,
  horizontalPosition: HorizontalPositionType,
  timer: ?number,
}

const DEFAULT_TIMEOUT = 5000;
const DEFAULT_VERTICAL = 'bottom';
const DEFAULT_HORIZONTAL = 'center';

class SnackbarProvider extends React.Component<Props, StateType> {

  state = {
    isSnackbarOpen: false,
    snackbarContent: '',
    verticalPosition: DEFAULT_VERTICAL,
    horizontalPosition: DEFAULT_HORIZONTAL,
    timer: null,
  };

  createSnackbar = (
    snackbarContent: React.Element,
    {
      timer, verticalPosition, horizontalPosition,
    }: {
      timer: ?number, verticalPosition: VerticalPositionType, horizontalPosition: HorizontalPositionType
    } = {},
  ) => {
    this.setState({
      snackbarContent,
      isSnackbarOpen: true,
      verticalPosition: verticalPosition || DEFAULT_VERTICAL,
      horizontalPosition: horizontalPosition || DEFAULT_HORIZONTAL,
      timer: timer ? (timer === -1 ? null : timer) : DEFAULT_TIMEOUT, // eslint-disable-line no-nested-ternary
    });
  };

  closeSnackbar = () => {
    this.setState({
      snackbarContent: '',
      isSnackbarOpen: false,
      verticalPosition: DEFAULT_VERTICAL,
      horizontalPosition: DEFAULT_HORIZONTAL,
      timer: null,
    });
  };

  handleSnackbarClose = (ev: ?Event, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ isSnackbarOpen: false });
  };

  render() {
    const { children, classes } = this.props;
    const {
      isSnackbarOpen, snackbarContent, timer, verticalPosition, horizontalPosition,
    } = this.state;
    return (
      <SnackbarContext.Provider value={{ createSnackbar: this.createSnackbar, closeSnackbar: this.closeSnackbar }}>
        {children}
        <Snackbar
          open={isSnackbarOpen}
          ContentProps={{
            classes: {
              root: classes.root,
            },
          }}
          anchorOrigin={{
            vertical: verticalPosition,
            horizontal: horizontalPosition,
          }}
          onClose={this.handleSnackbarClose}
          message={snackbarContent}
          autoHideDuration={timer}
          action={[
            <IconButton key="close" onClick={this.handleSnackbarClose}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </SnackbarContext.Provider>
    );
  }

}

export default compose(withStyles(styles, { withTheme: true }))(SnackbarProvider);
