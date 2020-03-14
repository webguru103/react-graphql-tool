import * as React from 'react';
import InteractivePage from './interactivePage';
import DroppablePage from './droppablePage';
import BasePage from './basePage';
import type { AdaptedPage, Page as PageType } from '../flowTypes';

type PropType = {
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
  passPageRefToEditor: Function,
  pages: Array<AdaptedPage>,
  pageIndex: number,
  mode: string,
  handleActiveSelectionClear: Function,
  pdfPages: Object,
  currentUser: string,
  addFieldsToSelection: (fieldIds: Array<number>, ?{ resetSelection: boolean }) => void,
  handleUpdateZoom: Function,
};

const Page = ({
  pages,
  handlePageClick,
  zoom,
  floatingFieldType,
  updateFloatingFieldType,
  setCurrentPageOnMouseMove,
  activeSelectionPageFields,
  handleClipboardFieldClear,
  handleClipboardFieldAdd,
  handleClipboardFieldsPaste,
  handleSelectedFieldsDuplicate,
  activeSelectionPageFieldPos,
  deleteActiveSelectionFields,
  copyFieldsToClipboard,
  handleActiveSelectionMove,
  passPageRefToEditor,
  pageIndex,
  mode,
  handleActiveSelectionClear,
  currentUser,
  addFieldsToSelection,
  handleUpdateZoom,
  pdfPages,
  ...restProps
}: PropType) => (
  <InteractivePage
    pageIndex={pageIndex}
    page={pages[pageIndex]}
    handlePageClick={handlePageClick}
    floatingFieldType={floatingFieldType}
    updateFloatingFieldType={updateFloatingFieldType}
    setCurrentPageOnMouseMove={setCurrentPageOnMouseMove}
    activeSelectionPageFields={activeSelectionPageFields}
    handleClipboardFieldClear={handleClipboardFieldClear}
    handleClipboardFieldsPaste={handleClipboardFieldsPaste}
    handleSelectedFieldsDuplicate={handleSelectedFieldsDuplicate}
    activeSelectionPageFieldPos={activeSelectionPageFieldPos}
    deleteActiveSelectionFields={deleteActiveSelectionFields}
    copyFieldsToClipboard={copyFieldsToClipboard}
    handleActiveSelectionMove={handleActiveSelectionMove}
    passPageRefToEditor={passPageRefToEditor}
    outsideClickIgnoreClass="pageOutClick"
    mode={mode}
    handleActiveSelectionClear={handleActiveSelectionClear}
    zoom={zoom}
    addFieldsToSelection={addFieldsToSelection}
    handleUpdateZoom={handleUpdateZoom}
  >
    <BasePage
      page={pages[pageIndex]}
      totalPages={pages.length}
      zoom={zoom}
      pdfPages={pdfPages}
    >
      <DroppablePage
        zoom={zoom}
        pages={pages}
        activeSelectionPageFields={activeSelectionPageFields}
        handleActiveSelectionMove={handleActiveSelectionMove}
        handleSelectedFieldsDuplicate={handleSelectedFieldsDuplicate}
        pageIndex={pageIndex}
        mode={mode}
        handleActiveSelectionClear={handleActiveSelectionClear}
        addFieldsToSelection={addFieldsToSelection}
        currentUser={currentUser}
        {...restProps}
      />
    </BasePage>
  </InteractivePage>
);

export default Page;
