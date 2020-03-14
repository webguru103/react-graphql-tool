import * as React from 'react';
// $FlowFixMe
import 'react-virtualized/styles.css';
import {
  List, AutoSizer, CellMeasurer, CellMeasurerCache,
} from 'react-virtualized';
import { withStyles } from '@material-ui/core';
import Page from './page/page';
import type {
  AdaptedPage, Page as PageType, Data,
} from './flowTypes';
import { DEFAULT_PAGE_WIDTH, DEFAULT_PAGE_HEIGHT, PAGE_SIDE_MARGIN } from '../constants';
import styles, { PAGE_BOTTOM_MARGIN } from './pageList.styles';
import PageHeader, { PAGE_HEADER_HEIGHT } from './pageHeader';

const PAGE_TOP_MARGIN = 20;

// In some browsers React Virtualized sets inner page width property to a value too large
// (possibly because vertical scrollbars take up extra space in those browsers) so horizontal scrollbars will
// always show up. This amount is to be subtracted from the inner page size so that the inner size
// is smaller than the react-virualized container, and no horizontal scroll appears.
const REACT_VIRTUALIZED_SCROLL_INSET = 30;

// When the page width becomes (PAGE_WIDTH * zoom) + PAGE_WIDTH_INCREASE_OFFSET,
// should add extra padding to the width (ZOOM_WIDTH_INCREASE) so the user can more
// comfortably scroll left to right on the page.
const PAGE_WIDTH_INCREASE_OFFSET = 100;

// Extra width to add to the page width, to fit the page and it's margins
// and avoid an issue with overlapping scrollbar on zoom
const ZOOM_WIDTH_INCREASE = PAGE_SIDE_MARGIN * 2;

type PropType = {
  pages: Array<AdaptedPage>,
  classes: Object,
  handleDocumentSwitch: Function,
  nextDocumentId: string,
  previousDocumentId: string,
  values: { [string]: Data },
  withRef: Function,
  page: PageType,
  handlePageClick: Function,
  zoom: number,
  floatingFieldType: ?string,
  updateFloatingFieldType: Function,
  setCurrentPageOnMouseMove: Function,
  activeSelectionPageFields: Array<number>,
  handleActiveSelectionMove: Function,
  handleClipboardFieldClear: Function,
  handleClipboardFieldAdd: Function,
  handleClipboardFieldsPaste: Function,
  handleSelectedFieldsDuplicate: Function,
  activeSelectionPageFieldPos: { [string]: { x: number, y: number } },
  deleteActiveSelectionFields: Function,
  copyFieldsToClipboard: Function,
  mode: string,
  pdf: Object,
  pdfPages: Array<React.Node>,
  passPageRefToEditor: Function,
  handleActiveSelectionClear: Function,
  listScrollTop: any,
  storeListScrollValues: Function,
  addFieldsToSelection: (fieldIds: Array<number>, ?{ resetSelection: boolean }) => void,
  handleUpdateZoom: Function,
  currentUser: string,
}

type RendererArgsType = {
  index: number,
  key: string,
  style: {
    x: number,
    y: number,
    height: number,
    width: number,
  },
  parent: React.Element,
};

class PageListC extends React.PureComponent<PropType, *> {

  cache = new CellMeasurerCache({
    defaultHeight: DEFAULT_PAGE_HEIGHT * this.props.zoom + PAGE_BOTTOM_MARGIN,
    defaultWidth: DEFAULT_PAGE_WIDTH * this.props.zoom,
  });

  componentDidUpdate(prevProps) {
    if (prevProps.zoom !== this.props.zoom) {
      if (this.listRef) {
        this.listRef.recomputeRowHeights(0);
      }
    }
  }

  pageRenderer = width => ({
    index, key, style, parent,
  }: RendererArgsType) => {
    const {
      pages,
      classes,
      handleDocumentSwitch,
      nextDocumentId,
      previousDocumentId,
      zoom,
      pdfPages,
      currentUser,
      handleUpdateZoom,
      ...restProps
    } = this.props;

    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div
          style={{
            ...style,
            width: width > (zoom * (pages[index].width || 0)) + PAGE_WIDTH_INCREASE_OFFSET
              ? width - REACT_VIRTUALIZED_SCROLL_INSET
              : (zoom * (pages[index].width || 0)) + ZOOM_WIDTH_INCREASE,
          }}
          className={classes.pageContainer}
          data-testid="pageContainer"
        >
          <div
            style={{
              height: (pages[index].height || 0) * zoom,
            }}
          >
            {pages && pages[index] && pages[index].pageNumber === 1 && (
              <PageHeader documentName={pages[index].documentName} />
            )}
            <Page
              {...restProps}
              pdfPages={pdfPages}
              zoom={zoom}
              key={key}
              pageIndex={index}
              pages={pages}
              currentUser={currentUser}
              handleUpdateZoom={handleUpdateZoom}
            />
          </div>
        </div>
      </CellMeasurer>
    );
  };

  listRef: React.Element;

  render() {
    const {
      zoom, pages, classes, storeListScrollValues, listScrollTop,
    } = this.props;

    return (
      <div
        className={classes.listContainer}
        data-testid="pagesContainer"
      >
        <AutoSizer>
          {
            ({ width, height }) => (
              <List
                ref={(r) => {
                  if (!this.listRef) {
                    this.listRef = r;
                  }
                }}
                pages={pages}
                height={height}
                scrollTop={listScrollTop}
                onScroll={items => storeListScrollValues(items)}
                rowHeight={({ index }) => {
                  if (pages && pages[index] && pages[index].pageNumber === 1) {
                    return pages[index].height * zoom + PAGE_HEADER_HEIGHT + PAGE_BOTTOM_MARGIN;
                  }
                  return pages[index].height * zoom + PAGE_BOTTOM_MARGIN;
                }}
                rowCount={pages.length}
                rowRenderer={this.pageRenderer(width)}
                style={{ outline: 'none', paddingTop: PAGE_TOP_MARGIN, overflow: 'auto' }}
                overscanRowCount={0}
                width={width}
                // Note containerStyle not listed in React Virtualized docs for List, but passed through to underlying Grid component.
                containerStyle={{ overflow: 'visible' }}
              />
            )
          }
        </AutoSizer>
      </div>
    );
  }

}

export default withStyles(styles)(PageListC);
