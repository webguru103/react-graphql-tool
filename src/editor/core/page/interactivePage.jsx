import * as React from 'react';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import { compose } from '../../../utility';
import styles from './interactivePage.styles';
import type { AdaptedPage, AdaptedField } from '../flowTypes';
import { getLineRectangle } from '../utils';
import {
  EDITOR_MODE,
  ZOOM_INCREASE_DEFAULT,
  ZOOM_DECREASE_DEFAULT,
  ZOOM_MINIMUM,
  ZOOM_MAXIMUM,
  ZOOM_PRECISION_FACTOR,
} from '../../constants';

type PropType = {
  children: React.Node,
  page: AdaptedPage,
  pageIndex: number,
  handleActiveSelectionMove: Function,
  setCurrentPageOnMouseMove: Function,
  activeSelectionPageFields: Array<number>,
  classes: Object,
  handleClipboardFieldsPaste: Function,
  handleSelectedFieldsDuplicate: Function,
  handlePageClick: Function,
  floatingFieldType: ?string,
  updateFloatingFieldType: Function,
  handleActiveSelectionClear: Function,
  deleteActiveSelectionFields: Function,
  copyFieldsToClipboard: Function,
  mode: string,
  passPageRefToEditor: Function,
  zoom: number,
  addFieldsToSelection: (fieldIds: Array<number>, ?{ resetSelection: boolean }) => void,
  handleUpdateZoom: Function,
}

type StateType = {
  mouseDown: boolean,
  selectionBoxStartPoint: {
    x: number,
    y: number,
  },
  selectionBox: {
    isDragging: boolean,
    top: number,
    left: number,
    width: number,
    height: number,
  }
}

export class InteractivePageC extends React.PureComponent<PropType, StateType> {

  state = {
    mouseDown: false,
    selectionBoxStartPoint: {
      x: 0,
      y: 0,
    },
    selectionBox: {
      isDragging: false,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
  };

  componentDidMount() {
    window.addEventListener('wheel', this.handleMouseZoom, { passive: false });
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleMouseZoom, { passive: false });
  }

  handleKeys = (e: SyntheticKeyboardEvent<>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'c':
          e.preventDefault();
          this.copyFieldsToClipboard();
          break;
        case 'v':
          e.preventDefault();
          this.pasteSelectionBoxFields();
          break;
        case '=':
          e.preventDefault();
          this.handleZoomIn(e);
          break;
        case '-':
          e.preventDefault();
          this.handleZoomOut(e);
          break;
        default:
          break;
      }
    } else {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          this.deselectFields();
          break;
        case 'Delete':
        case 'Backspace':
          e.preventDefault();
          this.deleteFields(e);
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          e.preventDefault();
          this.moveSelectionBoxFields(e);
          break;
        default:
          break;
      }
    }
  }

  handleMouseDown = (e: SyntheticMouseEvent<HTMLElement>) => {
    const pageRect = this.pageRef ? this.pageRef.getBoundingClientRect() : {};
    this.setState({
      mouseDown: true,
      selectionBoxStartPoint: {
        x: e.pageX - pageRect.left,
        y: e.pageY - pageRect.top,
      },
    });
  };

  handleClickOutside = (ev: SyntheticMouseEvent<HTMLElement>) => {
    if (this.props.floatingFieldType) {
      ev.preventDefault();
      ev.stopPropagation();
      this.props.updateFloatingFieldType(null);
    }
  };

  handleMouseMove = (e: SyntheticMouseEvent<HTMLElement>) => {
    const pageRect = this.pageRef ? this.pageRef.getBoundingClientRect() : {};

    this.mousePos = {
      x: e.pageX - pageRect.left,
      y: e.pageY - pageRect.top,
    };

    this.props.setCurrentPageOnMouseMove(this.props.pageIndex);

    if (this.state.mouseDown) {
      const { selectionBoxStartPoint } = this.state;
      const left = Math.min(selectionBoxStartPoint.x, this.mousePos.x);
      const top = Math.min(selectionBoxStartPoint.y, this.mousePos.y);
      const width = Math.abs(selectionBoxStartPoint.x - this.mousePos.x);
      const height = Math.abs(selectionBoxStartPoint.y - this.mousePos.y);
      this.setState({
        selectionBox: {
          isDragging: true,
          top,
          left,
          width,
          height,
        },
      });
    }
  };

  handleMouseUp = () => {
    if (this.state.mouseDown) {
      const { zoom, page: { fields }, addFieldsToSelection } = this.props;
      const { selectionBox } = this.state;
      const selectedPageFieldIds = [];

      const zoomAdjustedSelectionBox = {
        top: selectionBox.top / zoom,
        left: selectionBox.left / zoom,
        width: selectionBox.width / zoom,
        height: selectionBox.height / zoom,
        isDragging: selectionBox.isDragging,
      };

      (Object.values(fields): any).forEach((field) => {
        const collide = this.doObjectsCollide(zoomAdjustedSelectionBox, field);
        if (collide) {
          if (!selectedPageFieldIds.includes(field.id)) {
            selectedPageFieldIds.push(field.id);
          }
        }
      });

      if (selectedPageFieldIds.length) {
        addFieldsToSelection(selectedPageFieldIds);
      }

      this.setState({
        mouseDown: false,
        selectionBoxStartPoint: {
          x: 0,
          y: 0,
        },
        selectionBox: {
          isDragging: false,
          top: 0,
          left: 0,
          width: 0,
          height: 0,
        },
      });
    }
  };

  handleMouseZoom = (e: SyntheticWheelEvent<>) => {
    if (e.ctrlKey === true || e.metaKey === true) {
      e.preventDefault();
      if (e.deltaY < 0) {
        this.handleZoomIn(e);
      } else if (e.deltaY > 0) {
        this.handleZoomOut(e);
      }
    }
  }

  lineSegmentIntersects = (
    x1a: number,
    y1a: number,
    x2a: number,
    y2a: number,
    x1b: number,
    y1b: number,
    x2b: number,
    y2b: number,
  ) => {
    const determinant = (x2a - x1a) * (y2b - y1b) - (x2b - x1b) * (y2a - y1a);
    if (determinant === 0) {
      return false;
    }
    const lambda = ((y2b - y1b) * (x2b - x1a) + (x1b - x2b) * (y2b - y1a)) / determinant;
    const gamma = ((y1a - y2a) * (x2b - x1a) + (x2a - x1a) * (y2b - y1a)) / determinant;
    return (lambda > 0 && lambda < 1) && (gamma > 0 && gamma < 1);
  };

  doObjectsCollide = (selectionBox: Object, field: AdaptedField) => {
    if (field.type === 'line') {
      const topLeft = { x: selectionBox.left, y: selectionBox.top };
      const topRight = { x: selectionBox.left + selectionBox.width, y: selectionBox.top };
      const bottomLeft = { x: selectionBox.left, y: selectionBox.top + selectionBox.height };
      const bottomRight = { x: selectionBox.left + selectionBox.width, y: selectionBox.top + selectionBox.height };

      const topCheck = this.lineSegmentIntersects(
        field.x1 || 0, field.y1 || 0, field.x2 || 0, field.y2 || 0, topLeft.x, topLeft.y, topRight.x, topRight.y,
      );
      const leftCheck = this.lineSegmentIntersects(
        field.x1 || 0, field.y1 || 0, field.x2 || 0, field.y2 || 0, topLeft.x, topLeft.y, bottomLeft.x, bottomLeft.y,
      );
      const btmCheck = this.lineSegmentIntersects(
        field.x1 || 0, field.y1 || 0, field.x2 || 0, field.y2 || 0, bottomLeft.x, bottomLeft.y, bottomRight.x, bottomRight.y,
      );
      const rightCheck = this.lineSegmentIntersects(
        field.x1 || 0, field.y1 || 0, field.x2 || 0, field.y2 || 0, bottomRight.x, bottomRight.y, topRight.x, topRight.y,
      );

      const endPointCheck = ((selectionBox.left <= field.x1
        && selectionBox.left + selectionBox.width >= field.x1
        && selectionBox.top <= field.y1
        && selectionBox.top + selectionBox.height >= field.y1)
        || (selectionBox.left <= field.x2
        && selectionBox.left + selectionBox.width >= field.x2
        && selectionBox.top <= field.y2
        && selectionBox.top + selectionBox.height >= field.y2));

      return (topCheck || leftCheck || btmCheck || rightCheck || endPointCheck);
    }
    return (selectionBox.left <= field.x + field.width + 20
    && selectionBox.left + selectionBox.width >= field.x
    && selectionBox.top <= field.y + field.height + 20
    && selectionBox.top + selectionBox.height >= field.y);
  };

  handleClick = (ev: SyntheticMouseEvent<HTMLElement>, pageIndex: number) => {
    this.props.handlePageClick(ev, pageIndex);
  };

  moveSelectionBoxFields = (e: SyntheticKeyboardEvent<>) => {
    // pick first non-locked field from activeSelectionPagefields array to be used in handleActiveSelection call
    const movedActiveSelectionField = this.props.activeSelectionPageFields.filter(
      id => Object.keys(this.props.page.fields).includes(String(id)) && !this.props.page.fields[id].positionLock,
    );
    const field = this.props.page.fields[movedActiveSelectionField[0]];
    if (movedActiveSelectionField.length) {
      e.preventDefault();
      let xOffset = 0;
      let yOffset = 0;
      const modifier = e.shiftKey ? 5 : 1;

      switch (e.key) {
        case ('ArrowUp'):
          yOffset = -modifier;
          break;

        case ('ArrowDown'):
          yOffset = modifier;
          break;

        case ('ArrowLeft'):
          xOffset = -modifier;
          break;

        case ('ArrowRight'):
          xOffset = modifier;
          break;

        default:
      }

      let newX = 0;
      let newY = 0;

      if (field.type === 'line') {
        const { x, y } = getLineRectangle(field.x1 || 0, field.y1 || 0, field.x2 || 0, field.y2 || 0);
        newX = x + xOffset;
        newY = y + yOffset;
      } else {
        newX = field.x + xOffset;
        newY = field.y + yOffset;
      }

      this.props.handleActiveSelectionMove(field.id, newX, newY,
        this.props.pageIndex, this.props.pageIndex, { checkBoundaries: true });
    }
  };

  deselectFields = () => {
    this.props.handleActiveSelectionClear();
  };

  deleteFields = (e: SyntheticKeyboardEvent<>) => {
    e.preventDefault(); // Stop firefox from going back in page history.
    this.props.deleteActiveSelectionFields(this.props.pageIndex);
  };

  copyFieldsToClipboard = () => {
    this.props.copyFieldsToClipboard(this.props.pageIndex);
  };

  pasteSelectionBoxFields = () => {
    this.props.handleClipboardFieldsPaste(this.mousePos.x, this.mousePos.y);
  };

  duplicateSelectionBoxFields = (e: SyntheticEvent<>) => {
    e.preventDefault();
    this.props.handleSelectedFieldsDuplicate(this.props.pageIndex);
  };

  handleZoomIn = (e: SyntheticEvent<>) => {
    e.preventDefault();
    const { zoom, handleUpdateZoom } = this.props;
    if ((zoom * ZOOM_PRECISION_FACTOR) < ZOOM_MAXIMUM) {
      handleUpdateZoom(ZOOM_INCREASE_DEFAULT);
    }
  };

  handleZoomOut = (e: SyntheticEvent<>) => {
    e.preventDefault();
    const { zoom, handleUpdateZoom } = this.props;
    if ((zoom * ZOOM_PRECISION_FACTOR) > ZOOM_MINIMUM) {
      handleUpdateZoom(ZOOM_DECREASE_DEFAULT);
    }
  };

  handlePageRef = (ref: React.Element) => {
    const { pageIndex, passPageRefToEditor } = this.props;

    passPageRefToEditor(ref, pageIndex);

    if (!this.pageRef && ref) {
      this.pageRef = ref;
    }
  };

  mousePos: {x: number, y: number};

  pageRef: HTMLElement | null;

  render() {
    const {
      classes,
      children,
      mode,
      pageIndex,
    } = this.props;

    const { selectionBox, mouseDown } = this.state;

    return (
      <div
        ref={r => this.handlePageRef(r)}
        className={classnames(classes.page, 'pageOutClick')}
        role="presentation"
        tabIndex="-1"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onClick={e => this.handleClick(e, pageIndex)}
        onKeyDown={(mode !== EDITOR_MODE.TEMPLATE_PUBLISHED) ? e => this.handleKeys(e) : {}}
      >
        {children}
        {mouseDown
            && (
            <div
              className={classnames({ [classes.selectionBox]: true, [classes.isDragging]: selectionBox.isDragging })}
              style={{
                left: selectionBox.left,
                top: selectionBox.top,
                width: selectionBox.width,
                height: selectionBox.height,
                pointerEvents: 'none',
              }}
            />
            )
          }
      </div>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  onClickOutside,
)(InteractivePageC);
