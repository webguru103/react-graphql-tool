import * as React from 'react';
import { DropTarget, DragLayer } from 'react-dnd';
import { withStyles } from '@material-ui/core';
import throttle from 'lodash.throttle';

import styles from './droppablePage.styles';
import { compose, get } from '../../../utility';
import FieldWrapper from '../fieldWrapper/fieldWrapper';
import LineField from '../lineField/lineField';
import DragPreview from '../dragPreview';
import c from '../../constants';
import type { AdaptedPage } from '../flowTypes';
import { adjustResizeDimensions } from '../utils';

const fieldTarget = {
  drop(props, monitor, component: any) {
    const itemType = monitor.getItemType();
    const item = monitor.getItem();
    const { pageRef } = component;
    const pageRect = pageRef.getBoundingClientRect();

    const difference = monitor.getDifferenceFromInitialOffset();

    if (itemType === c.ItemTypes.CHECKBOX
      || itemType === c.ItemTypes.TEXT
      || itemType === c.ItemTypes.DATE
      || itemType === c.ItemTypes.SIGNATURE
      || itemType === c.ItemTypes.LINE
      || itemType === c.ItemTypes.INITIAL
    ) {
      const fieldOffset = monitor.getClientOffset();

      component.addField(itemType, (fieldOffset.y - pageRect.top) / props.zoom, (fieldOffset.x - pageRect.left) / props.zoom);
    } else if (itemType === c.ItemTypes.FIELD) {

      const fieldOffset = monitor.getSourceClientOffset();
      const newX = Math.round((fieldOffset.x - pageRect.left) / props.zoom);
      const newY = Math.round((fieldOffset.y - pageRect.top) / props.zoom);

      component.moveFields(item.id, newX, newY, item.pageIndex);

    } else if (itemType === c.ItemTypes.RESIZE) {

      let newWidth = item.width + Math.floor(difference.x / props.zoom);
      let newHeight = item.height + Math.floor(difference.y / props.zoom);

      const newRightPosition = item.x + newWidth;
      const newBottomPosition = item.y + newHeight;

      if (newRightPosition * props.zoom > pageRect.width) {
        newWidth -= (newRightPosition - pageRect.width / props.zoom);
      }

      if (newBottomPosition * props.zoom > pageRect.height) {
        newHeight -= (newBottomPosition - pageRect.height / props.zoom);
      }

      component.resizeField(item.id, newWidth, newHeight, item.pageId);
    }
  },
};

type PropType = {
  handleFieldResize: Function,
  connectDropTarget: Function,
  handleLineFieldUpdate: Function,
  handleFieldAdd: Function,
  handleActiveSelectionRemove: Function,
  activeSelectionPageFields: Array<number>,
  classes: Object,
  pageIndex: number,
  handleActiveSelectionClear: Function,
  handleActiveSelectionMove: Function,
  handleFieldUpdate: Function,
  handleBlur: Function,
  handleChange: Function,
  setFieldValue: Function,
  handleActiveSelectionClear: Function,
  handleActiveSelectionMove: Function,
  values: { [number]: Array<boolean> },
  addFieldsToSelection: Function,
  zoom: number,
  activeSelectionRelPos: { [string]: { x: number, y: number } },
  activeSelectionBox: { top: number, left: number },
  activePage: string,
  currentOffset: { x: number, y: number },
  isDragging: boolean,
  itemType: string,
  item: {
    id: string,
    pageIndex: number,
  },
  pages: Array<AdaptedPage>,
  pageRefs: {
    [number]: HTMLDivElement,
  },
  mode: string,
  handleSelectedFieldsDuplicate: Function,
  colorMap: ?{[string]: { red: string, blue: string, green: string, alpha: string }},
  currentUser: string,
}

type StateType = {
  offsetHeight: number,
  offsetWidth: number,
  resizingId: ?string,
}

export class DroppablePageC extends React.PureComponent<PropType, StateType> {

  addField = (type: string, top: number, left: string) => {
    this.props.handleFieldAdd(type, top, left, this.props.pageIndex);
  };

  resizeField = (id: number, width: number, height: number) => {
    const { pages, pageIndex } = this.props;
    const page = pages[pageIndex];
    const field = page.fields[id];
    if (field) {
      const { newHeight: adjustedHeight, newWidth: adjustedWidth } = adjustResizeDimensions(width, height, field.type);
      this.props.handleFieldResize(
        id,
        adjustedWidth,
        adjustedHeight,
        pageIndex,
      );
    }
  };

  updateLineField = (id: number, x1: number, y1: number, x2: number, y2: number) => {
    const { pages, pageIndex } = this.props;
    const page = pages[pageIndex];
    const field = page.fields[id];

    const fieldUpdate = {
      ...field,
      x1,
      y1,
      x2,
      y2,
    };

    if (field) {
      this.props.handleLineFieldUpdate(
        id,
        fieldUpdate,
        pageIndex,
      );
    }
  };

  moveFields = (
    id: string,
    x: number,
    y: number,
    sourcePageIndex: string,
  ) => {
    this.props.handleActiveSelectionMove(id, x, y, sourcePageIndex, this.props.pageIndex, { checkBoundaries: true });
  };

  pageRef: React.Element | null;

  render() {
    const {
      classes,
      connectDropTarget,
      activeSelectionPageFields,
      handleActiveSelectionRemove,
      handleActiveSelectionClear,
      zoom,
      handleFieldUpdate,
      handleChange,
      setFieldValue,
      values,
      pages,
      addFieldsToSelection,
      activeSelectionRelPos,
      activeSelectionBox,
      activePage,
      currentOffset,
      isDragging,
      itemType,
      handleBlur,
      pageIndex,
      item,
      mode,
      handleSelectedFieldsDuplicate,
      colorMap,
      ...restProps
    } = this.props;

    const yOffset = get(currentOffset, 'y');
    const xOffset = get(currentOffset, 'x');
    const isDraggingAnyField = isDragging && itemType === c.ItemTypes.FIELD;

    const page = pages[pageIndex];
    return connectDropTarget((
      <div
        ref={r => (this.pageRef = r)}
        className={classes.root}
        data-testid={`droppablePage-${pageIndex}`}
      >
        {
          (Object.values(page.fields): any).map((field) => {
            const inActiveSelection = activeSelectionPageFields.includes(field.id);
            const isDraggingThisField = isDragging && (field.id === item.id);

            if (field.type === 'line') {
              return (
                <LineField
                  dragging={isDraggingAnyField}
                  resizing={isDragging && itemType === c.ItemTypes.RESIZE && field.id === (item && item.id)}
                  offsetHeight={isDraggingThisField ? yOffset : null}
                  offsetWidth={isDraggingThisField ? xOffset : null}
                  field={field}
                  key={`line-${field.id}`}
                  pageRef={this.pageRef}
                  pageIndex={pageIndex}
                  handleLineFieldUpdate={this.updateLineField}
                  zoom={zoom}
                  handleActiveSelectionClear={handleActiveSelectionClear}
                  addFieldsToSelection={addFieldsToSelection}
                  handleActiveSelectionRemove={handleActiveSelectionRemove}
                  currentActivePageField={activeSelectionPageFields.length === 1 && inActiveSelection}
                  inActiveSelection={inActiveSelection}
                  outsideClickIgnoreClass="fieldOutClick"
                  disableOnClickOutside={!(activeSelectionPageFields[0] === field.id)}
                  mode={mode}
                />
              );
            }

            return (
              <FieldWrapper
                {...restProps}
                dragging={isDraggingAnyField && (field.id === item.id)}
                draggingAny={isDraggingAnyField}
                resizing={isDragging && itemType === c.ItemTypes.RESIZE && field.id === (item && item.id)}
                offsetHeight={isDraggingThisField ? yOffset : null}
                offsetWidth={isDraggingThisField ? xOffset : null}
                resizingId={isDraggingThisField ? item.id : null}
                field={field}
                key={`fieldwrapper-${field.type}-${field.id}`}
                pageIndex={pageIndex}
                pageRef={this.pageRef}
                docId={page.documentId}
                handleFieldResize={this.resizeField}
                zoom={zoom}
                handleBlur={handleBlur}
                handleFieldUpdate={handleFieldUpdate}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                value={values[page.documentId] && values[page.documentId][field.dataReference]}
                handleActiveSelectionClear={handleActiveSelectionClear}
                addFieldsToSelection={addFieldsToSelection}
                handleActiveSelectionRemove={handleActiveSelectionRemove}
                handleSelectedFieldsDuplicate={handleSelectedFieldsDuplicate}
                currentActivePageField={activeSelectionPageFields.length === 1 && inActiveSelection}
                inActiveSelection={inActiveSelection}
                disableOnClickOutside={!(activeSelectionPageFields[0] === field.id)}
                outsideClickIgnoreClass="fieldOutClick"
                color={colorMap && colorMap[field.assignee]}
                mode={mode}
              />
            );
          })
        }
        {
          activePage === pageIndex && isDragging && itemType === c.ItemTypes.FIELD
          && (
          <DragPreview
            isDragging={isDragging}
            currentOffset={currentOffset}
            fields={page.fields}
            activeSelectionRelPos={activeSelectionRelPos}
            activeSelectionBox={activeSelectionBox}
            zoom={zoom}
          />
          )
        }
      </div>
    ));
  }

}

let target: any = null;
const throttleTarget = throttle(() => target.getDifferenceFromInitialOffset(), 35);

export default compose(
  withStyles(styles),
  DragLayer((monitor) => {

    if (target === null) {
      target = monitor;
    }

    return {
      currentOffset: throttleTarget(),
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
    };
  }),
  DropTarget(
    [
      c.ItemTypes.FIELD,
      c.ItemTypes.RESIZE,
      c.ItemTypes.CHECKBOX,
      c.ItemTypes.TEXT,
      c.ItemTypes.DATE,
      c.ItemTypes.SIGNATURE,
      c.ItemTypes.INITIAL,
      c.ItemTypes.LINE,
      c.ItemTypes.RESIZE_LINE,
    ],
    fieldTarget,
    connect => ({
      connectDropTarget: connect.dropTarget(),
    }),
  ),
)(DroppablePageC);
