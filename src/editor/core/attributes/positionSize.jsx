import * as React from 'react';
import debounce from 'lodash.debounce';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Lock from '@material-ui/icons/Lock';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core';
import styles from './positionSize.styles';
import type { AdaptedBoolField, AdaptedInitialField, AdaptedTextField } from '../flowTypes';
import { adjustResizeDimensions } from '../utils';
import {
  adjustNewHeightOrWidthForBoundaries,
  adjustNewXOrYForBoundaries,
} from './positionSize.utils';

type Props = {
  classes: Object,
  pageIndex: number,
  pageField: AdaptedTextField | AdaptedBoolField | AdaptedInitialField,
  disabled: boolean,
  handleFieldUpdate: Function,
  handleFieldResize: Function,
  handleActiveSelectionMove: Function,
  pageRef: HTMLDivElement,
  zoom: number,
  disablePosition: boolean,
  disableSize: boolean,
};

type State = {
  currentX: number,
  currentY: number,
  currentWidth: number,
  currentHeight: number,
  positionLock: boolean,
};

class PositionSizeC extends React.Component<Props, State> {

  state = {
    currentX: this.props.pageField.x || 0,
    currentY: this.props.pageField.y || 0,
    currentWidth: this.props.pageField.width || 0,
    currentHeight: this.props.pageField.height || 0,
    positionLock: this.props.pageField.positionLock || false,
  };

  updateField = debounce((type: string, currentState: State) => {
    const {
      pageField,
      pageIndex,
      handleActiveSelectionMove,
      handleFieldResize,
      handleFieldUpdate,
    } = this.props;
    const {
      currentX,
      currentY,
      currentWidth,
      currentHeight,
      positionLock,
    } = currentState;

    if (type === 'position') {
      handleActiveSelectionMove(
        pageField.id,
        currentX,
        currentY,
        pageIndex,
        pageIndex,
      );
    } else if (type === 'positionLock') {
      handleFieldUpdate(
        [{
          id: pageField.id,
          positionLock,
          type: pageField.type,
          pageIndex,
        }],
      );
    } else if (type === 'size') {
      handleFieldResize(
        pageField.id,
        currentWidth,
        currentHeight,
        pageIndex,
      );
    }

  }, 50);

  componentDidUpdate(prevProps) {
    const {
      pageField: {
        x: currentX, y: currentY, width: currentWidth, height: currentHeight,
      },
    } = this.props;
    if (prevProps.pageField.x !== currentX
      || prevProps.pageField.y !== currentY
      || prevProps.pageField.width !== currentWidth
      || prevProps.pageField.height !== currentHeight
    ) {
      this.setState({
        currentX, currentY, currentWidth, currentHeight,
      });
    }
  }

  handleChangeSize = async (width: number, height: number, forceParentUpdate?: boolean) => {
    const {
      pageRef, pageField, zoom,
    } = this.props;

    const {
      currentX,
      currentY,
      currentHeight,
      positionLock,
    } = this.state;

    if (positionLock) {
      return;
    }

    this.setState({
      currentWidth: width,
      currentHeight: height,
    });

    const newDimensions = adjustNewHeightOrWidthForBoundaries(pageRef, currentX, currentY, width, height, zoom);

    const { newWidth, newHeight } = adjustResizeDimensions(
      newDimensions.width, newDimensions.height, pageField.type, { byHeight: height !== currentHeight },
    );

    // forceParentUpdate is used on blur to send adjusted values to parent.
    if (forceParentUpdate) {
      this.setState({
        currentWidth: newWidth,
        currentHeight: newHeight,
      });
    }

    // Only pass update upward if values are valid.
    if ((newWidth === width && newHeight === height) || forceParentUpdate) {
      // Pass current state into this.updateField so that we specify what is passed
      // in to debounced function, guaranteeing values will be the same when update is
      // actually called.
      this.updateField('size', {
        currentWidth: newWidth,
        currentHeight: newHeight,
        positionLock,
        currentX,
        currentY,
      });
    }
  }

  handleChangePosition = async (x: number, y: number, forceParentUpdate?: boolean) => {
    const {
      pageRef, zoom,
    } = this.props;

    const {
      currentWidth,
      currentHeight,
      positionLock,
    } = this.state;

    if (positionLock) {
      return;
    }

    this.setState({
      currentX: x,
      currentY: y,
    });

    const newDimensions = adjustNewXOrYForBoundaries(pageRef, x, y, currentWidth, currentHeight, zoom);

    // forceParentUpdate is used on blur to send adjusted values to parent.
    if (forceParentUpdate) {
      this.setState({
        currentX: newDimensions.x,
        currentY: newDimensions.y,
      });

    }

    if ((x === newDimensions.x && y === newDimensions.y) || forceParentUpdate) {
      // Pass current state into this.updateField so that we specify what is passed
      // in to debounced function, guaranteeing values will be the same when update is
      // actually called.
      this.updateField('position', {
        currentWidth,
        currentHeight,
        positionLock,
        currentX: newDimensions.x,
        currentY: newDimensions.y,
      });
    }
  }

  handlePositionLockToggle = () => {
    const update = {
      positionLock: !this.state.positionLock,
    };
    this.setState(update, () => this.updateField('positionLock', this.state));
  }

  render() {
    const {
      classes,
      disabled,
      pageField,
      disablePosition,
      disableSize,
    } = this.props;
    const {
      currentX,
      currentY,
      currentWidth,
      currentHeight,
      positionLock,
    } = this.state;

    return (
      <div>
        <div className={classes.positionLock}>
          <FormLabel className={classes.formLabel}>Lock</FormLabel>
          <Checkbox
            checked={positionLock}
            disabled={disabled}
            onChange={this.handlePositionLockToggle}
            value="updateFormBase"
            name="updateFormBase"
          />
        </div>
        {
          !disablePosition && (
            <div className={classes.sectionRow}>
              <FormLabel classes={{ root: classes.formLabel }}>Position</FormLabel>
              <InputLabel classes={{ root: classes.inputLabel }}>x</InputLabel>
              <Input
                classes={{ root: classes.input }}
                value={currentX.toString()}
                inputProps={{ min: 0 }}
                onChange={e => this.handleChangePosition(Number(e.target.value), currentY)}
                onBlur={e => this.handleChangePosition(Number(e.target.value), currentY, true)}
                type="number"
                disabled={disabled || positionLock}
              />
              <div className={classes.absentLockSpacing} />
              <InputLabel classes={{ root: classes.inputLabel }}>y</InputLabel>
              <Input
                classes={{ root: classes.input }}
                value={currentY.toString()}
                inputProps={{ min: 0 }}
                onChange={e => this.handleChangePosition(currentX, Number(e.target.value))}
                onBlur={e => this.handleChangePosition(currentX, Number(e.target.value), true)}
                type="number"
                disabled={disabled || positionLock}
              />
            </div>
          )
        }
        {
          !disableSize && (
            <div className={classes.sectionRow}>
              <FormLabel classes={{ root: classes.formLabel }}>Size</FormLabel>
              <InputLabel classes={{ root: classes.inputLabel }}>width</InputLabel>
              <Input
                classes={{ root: classes.input }}
                value={currentWidth.toString()}
                inputProps={{ min: 0 }}
                onChange={e => this.handleChangeSize(Number(e.target.value), currentHeight)}
                onBlur={e => this.handleChangeSize(Number(e.target.value), currentHeight, true)}
                type="number"
                disabled={disabled || positionLock}
              />
              {pageField.type !== 'text' ? <Lock classes={{ root: classes.icon }} /> : <div className={classes.absentLockSpacing} />}
              <InputLabel classes={{ root: classes.inputLabel }}>height</InputLabel>
              <Input
                classes={{ root: classes.input }}
                value={currentHeight.toString()}
                inputProps={{ min: 0 }}
                onChange={e => this.handleChangeSize(currentWidth, Number(e.target.value))}
                onBlur={e => this.handleChangeSize(currentWidth, Number(e.target.value), true)}
                type="number"
                disabled={disabled || positionLock}
              />
            </div>
          )
        }
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(PositionSizeC);
