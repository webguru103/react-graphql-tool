import * as React from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import Field from '../field';
import {
  compose, isDefined, get, identity,
} from '../../../utility';
import styles from './fieldWrapper.styles';
import c, { EDITOR_MODE } from '../../constants';
import type {
  AdaptedBoolField,
  AdaptedTextField,
  AdaptedSignatureField,
  AdaptedInitialField,
  Data,
  AdaptedDateField,
} from '../flowTypes';
import { adjustResizeDimensions } from '../utils';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const fieldSource = {
  beginDrag(props) {
    const {
      field: {
        id, x, y, width, height,
      }, inActiveSelection, pageIndex,
    } = props;
    return {
      id, pageIndex, x, y, width, height, inActiveSelection,
    };
  },
};

/**
 * Specifies resize dragging contract
 */
const fieldSourceResize = {
  beginDrag(props, _, component: any) {
    const {
      field: {
        id, x, y, width, height,
      }, pageIndex,
    } = props;
    return {
      id, pageIndex, x, y, width, height, fieldRef: component.instanceRef.fieldRef,
    };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      const { field: { width, height }, pageIndex } = props;
      props.handleFieldResize(props.id, width, height, pageIndex);
    }
  },
};

/**
 * Props to inject
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

/**
 * Props to inject for resize dragging.
 */
function collectResize(connect, monitor) {
  return {
    connectDragPreviewResize: connect.dragPreview(),
    connectDragSourceResize: connect.dragSource(),
    isDraggingResize: monitor.isDragging(),
  };
}

type PropType = {
  classes: Object,
  connectDragSource: Function,
  connectDragSourceResize: Function,
  connectDragPreview: Function,
  connectDragPreviewResize: Function,
  dragging: boolean,
  draggingAny: boolean,
  currentActivePageField: boolean,
  inActiveSelection: boolean,
  handleActiveSelectionRemove: Function,
  handleActiveSelectionClear: Function,
  handleSelectedFieldsDuplicate: Function,
  zoom: number,
  handleBlur: Function,
  handleFieldUpdate: Function,
  handleChange: Function,
  setFieldValue: Function,
  value: Data,
  offsetHeight: number,
  offsetWidth: number,
  pageIndex: number,
  addFieldsToSelection: Function,
  field: AdaptedTextField | AdaptedBoolField | AdaptedSignatureField | AdaptedInitialField | AdaptedDateField,
  resizing: boolean,
  pageRef: React.Element,
  handleFieldResize: (id: number, width: number, height: number, pageIndex: number) => void,
  mode: string,
  isDraggingResize: boolean,
  color: { main: { red: string, blue: string, green: string, alpha: string}, light: { red: string, blue: string, green: string, alpha: string} },
  docId: number,
  currentUser: string,
}

class FieldWrapperC extends React.Component<PropType, {focused: boolean}> {

  state = {
    focused: false,
  }

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  shouldComponentUpdate(nextProps: PropType) {
    // Update this component when it is in the active selection,
    // unless just switching from selected to not selected.
    if (this.props.inActiveSelection !== nextProps.inActiveSelection) {
      return true;
    }

    // Update the component as a result of external events, like zoom change
    // or value update even if it's not currently selected.
    if (this.props.value !== nextProps.value || this.props.zoom !== nextProps.zoom) {
      return true;
    }

    if (!nextProps.inActiveSelection) {
      return false;
    }

    return true;
  }

  handleClickOutside = () => {
    this.props.handleActiveSelectionClear();
  };

  handleFieldClick = (ev: SyntheticMouseEvent<HTMLElement>, id: number) => {
    const {
      inActiveSelection, addFieldsToSelection, handleActiveSelectionRemove,
    } = this.props;

    ev.stopPropagation();

    if (ev.ctrlKey || ev.metaKey) {
      if (inActiveSelection) {
        handleActiveSelectionRemove(id);
      } else {
        addFieldsToSelection([id]);
      }
    } else if (!inActiveSelection) {
      addFieldsToSelection([id], { resetSelection: true });
    }
  };

  handleFieldRef = (ref) => {
    if (ref) {
      this.fieldRef = ref;
    }
  };

  handleKeyDownResizeHandle = (e) => {
    // Allow copy keypress to propagate when resize handle is focused.
    if (((e.ctrlKey || e.metaKey) && e.key === 'c')) {
      return;
    }
    e.stopPropagation();
  }

  setFocus = (focus: boolean) => {
    this.setState({ focused: focus });
  }

  fieldRef: React.Element;

  render() {
    const {
      field,
      classes,
      connectDragSourceResize,
      dragging,
      offsetHeight,
      offsetWidth,
      resizing,
      mode,
      inActiveSelection,
      zoom,
      handleBlur,
      handleFieldUpdate,
      handleChange,
      setFieldValue,
      value,
      pageRef,
      handleFieldResize,
      handleSelectedFieldsDuplicate,
      pageIndex,
      currentActivePageField,
      connectDragPreviewResize,
      isDraggingResize,
      color,
      docId,
      draggingAny,
      ...restProps
    } = this.props;

    let { connectDragSource } = this.props;

    // disable drag/drop in view mode or if the field is locked
    if ((mode !== EDITOR_MODE.TEMPLATE_DRAFT && mode !== EDITOR_MODE.INSTANCE_PREPARATION)
      || field.positionLock) {
      connectDragSource = identity;
    }

    if (this.state.focused) {
      connectDragSource = identity;
    }

    let adjustedWidth = field.width;
    let adjustedHeight = field.height;

    if (resizing && isDefined(offsetWidth) && isDefined(offsetHeight)) {
      const {
        newWidth: resizingWidth,
        newHeight: resizingHeight,
      } = adjustResizeDimensions(field.width + (offsetWidth / zoom), field.height + (offsetHeight / zoom), field.type);
      adjustedWidth = resizingWidth;
      adjustedHeight = resizingHeight;
    }
    let backgroundColor = 'rgba(255, 224, 187, 0.5)';

    if (mode === EDITOR_MODE.INSTANCE_PREPARATION && color) {
      if ((field.type === 'signature' || field.type === 'initial') && get(value, 'value.data')) {
        // If signature field has value, it never has background
        backgroundColor = 'transparent';
      } else if (field.type === 'checkbox') {
        // TODO add checkbox border color
        backgroundColor = `rgba(${color.light.red}, ${color.light.green}, ${color.light.blue}, ${color.light.alpha})`;
      } else if (inActiveSelection) {
        backgroundColor = 'transparent';
      } else {
        backgroundColor = `rgba(${color.main.red}, ${color.main.green}, ${color.main.blue}, ${color.main.alpha})`;
      }
    }

    return (
      <div className="fieldOutClick">
        {connectDragSource((
          <div
            onMouseDown={e => this.handleFieldClick(e, field.id)}
            role="button"
            tabIndex="-1"
            style={{
              left: field.x ? field.x * zoom : 0,
              top: field.y ? field.y * zoom : 0,
              height: adjustedHeight ? adjustedHeight * zoom : 0,
              width: adjustedWidth ? adjustedWidth * zoom : 0,
              backgroundColor,
            }}
            key={field.id}
            data-testid={`fieldWrapper-${field.id}`}
            className={classnames({
              [classes.field]: true,
              [classes.dragging]: draggingAny && inActiveSelection,
              [classes.activeSelection]: inActiveSelection,
              [classes.temporary]: field.temporary,
              [classes.locked]: (field.positionLock === true),
              [classes.viewOnly]: (mode === EDITOR_MODE.TEMPLATE_PUBLISHED || mode === EDITOR_MODE.INSTANCE_VIEW),
              [classes.initialsField]: field.type === 'initial',
              [classes.signatureField]: field.type === 'signature',
            })}
          >
            <Field
              {...restProps}
              docId={docId}
              zoom={zoom}
              pageIndex={pageIndex}
              handleBlur={handleBlur}
              handleFieldUpdate={handleFieldUpdate}
              handleFieldResize={handleFieldResize}
              handleSelectedFieldsDuplicate={handleSelectedFieldsDuplicate}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              value={get(value, 'value.data')}
              pageRef={pageRef}
              withRef={this.handleFieldRef}
              mode={mode}
              dragging={isDraggingResize}
              field={field}
              setFocus={this.setFocus}
            />
            {connectDragPreviewResize(<div className={classes.blank}>&#0020;</div>)}
          </div>
        ))}
        {(mode !== EDITOR_MODE.TEMPLATE_PUBLISHED && field.positionLock !== true) && currentActivePageField && connectDragSourceResize((
          <div
            onMouseDown={e => e.stopPropagation()}
            onKeyDown={e => this.handleKeyDownResizeHandle(e)}
            role="button"
            tabIndex="-1"
          >
            {field.type !== 'date' && (
              <div
                className={classnames({
                  [classes.resizeHandle]: true,
                  [classes.resizeDragging]: dragging,
                  [classes.resizeDragging]: dragging,
                })}
                style={{
                  left: (field.x + adjustedWidth) * zoom,
                  top: (field.y + adjustedHeight) * zoom,
                }}
              />
            )}
          </div>
        ))
        }
      </div>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  DragSource(c.ItemTypes.FIELD, fieldSource, collect),
  DragSource(c.ItemTypes.RESIZE, fieldSourceResize, collectResize),
  onClickOutside,
)(FieldWrapperC);
