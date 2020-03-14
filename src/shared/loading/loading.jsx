import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import styles from './loading.styles';

type Props = {
  // message is the text that you'd like to display above the circular loading indicator
  message: Node,

  // timeoutMessage is displayed after a specified amount of time, replacing the progress indicator.
  // This can be used to indicate an error, for example.
  timeoutMessage: Node,

  // rootStyles are additional styles that can be passed in to replace styles in the root of the component.
  rootStyles: Object,

  // timeout specifies the amount of time before timeoutMessage is displayed. If not timeoutMessage is
  // supplied, timeout is not used.
  timeout?: number,

  // enterDelay specifies the amount of time to wait before showing the loading indicator. The Loading component may
  // be rendered because, for example, a form is not yet loaded, but you may want to delay the display of the progress
  // indicator if the form is loaded in an acceptable amount of time - say 200ms.
  // This will prevent a flash on screen of the loading indicator if the form is loaded in under (enterDelay) seconds.
  enterDelay?: number,

  // lineThickness defines the thickness of the loading indicator.
  lineThickness?: number,

  // classes is the styles object injected by withStyles
  classes: Object,
}

type State = {
  displayMessage: Node,
  displayLoading: boolean,
  showCircularProgress: boolean,
}

export class LoadingC extends React.Component<Props, State> {

  static defaultProps = {
    timeout: 5000,
    enterDelay: 400,
    lineThickness: 80,
  }

  state = {
    displayMessage: null,
    showCircularProgress: false,
    displayLoading: false,
  };

  componentDidMount() {
    this.timeout = setTimeout(this.errorState, this.props.timeout);
    this.begin = setTimeout(this.showMessage, this.props.enterDelay);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearTimeout(this.begin);
  }

  showMessage = () => {
    this.setState({
      displayLoading: true,
      displayMessage: this.props.message,
      showCircularProgress: true,
    });
  };

  errorState = () => {
    const { timeoutMessage } = this.props;

    // If timeoutMessage is not supplied, loading indicator and
    // displayMessage continue to be displayed.
    if (timeoutMessage) {
      this.setState({
        displayMessage: this.props.timeoutMessage,
        showCircularProgress: false,
      });
    }
  };

  timeout: TimeoutID;

  begin: TimeoutID;

  render() {
    const { showCircularProgress, displayMessage, displayLoading } = this.state;
    const { classes, rootStyles, lineThickness } = this.props;
    return displayLoading && (
      <div
        className={classes.root}
        style={rootStyles}
      >
        {showCircularProgress && <CircularProgress color="primary" size={lineThickness} thickness={7} />}
        {displayMessage && (
          <div className={classes.displayMessage}>
            {displayMessage}
          </div>
        )
        }
      </div>
    );
  }

}

export default withStyles(styles)(LoadingC);
