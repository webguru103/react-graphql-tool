/* eslint react/no-access-state-in-setstate: 0 */

import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import update from 'immutability-helper';
import { withRouter } from 'react-router';
import debounce from 'lodash.debounce';
import styles from './templateEditor.styles';
import {
  get, pro, compose,
} from '../../../utility';
import AttributesPanel from '../attributes/attributesPanel';
import ConfirmMultiDeleteDialog from '../confirmMultiDeleteDialog';
import { withDialog } from '../../../shared/dialog/withDialog';
import c, {
  EDITOR_MODE,
  ZOOM_MINIMUM,
  ZOOM_MAXIMUM,
  ZOOM_PRECISION_FACTOR,
  DEFAULT_ZOOM,
  DEFAULT_TEXTBOX_HEIGHT,
  DEFAULT_TEXTBOX_WIDTH,
  DEFAULT_DATE_HEIGHT,
  DEFAULT_DATE_WIDTH,
  DEFAULT_CHECKBOX_HEIGHT,
  DEFAULT_CHECKBOX_WIDTH,
  DEFAULT_SIGNATURE_WIDTH,
  DEFAULT_SIGNATURE_HEIGHT,
  DEFAULT_LINE_LENGTH,
  DEFAULT_INITIAL_HEIGHT,
  DEFAULT_INITIAL_WIDTH,
  DUPLICATION_OFFSET, PAGE_LIST_MIN_WIDTH, PAGE_SIDE_MARGIN,
} from '../../constants';
import Toolbar from '../toolbar/toolbar';
import Banner from '../banner';
import PageList from '../pageList';
import {
  adaptFields,
  checkMoveBoundaries,
} from './templateEditor.utils';
import {
  determineRelativePositions,
  generateColorMap,
  getLineRectangle,
  preparePages,
  generateDataFieldByType,
} from '../utils';
import PageManager from '../pageManager';
import { withSnackbar } from '../../../shared/snackbar/withSnackbar';
import { fieldTemplates } from './fieldTemplates';
import type {
  Data,
  LineField,
  AdaptedPage,
  AdaptedField,
  FieldTemplate,
  EditorDocument,
} from '../flowTypes';
import type { CreatePageFieldsResponse } from '../../../agent-panel/api/mutations/createDocPageFields';
import type { UpdateDocPageFieldsResponse } from '../../../agent-panel/api/mutations/updateDocPageFields';
import type { SessionSignee } from '../../../agent-panel/api/fragments/sessionSignee';
import { withAppUser } from '../../../shared/authorization';
import type { AppUser } from '../../../shared/authorization';
import type { UserStampInput, CreateUserStampResponse } from '../../../agent-panel/api/mutations/createUserStamp';

const REACT_VIRTUALIZED_SCROLLTOP_UPDATE_TIME = 150;
const MAX_FIELDS_PER_PAGE = 500;

type PropType = {
  classes: Object,
  mode: 'template-draft' | 'template-published',
  nextDocumentId: string,
  previousDocumentId: string,
  handleDocumentSwitch: Function,
  addValues: (Object, number) => void,
  values: { [number]: any},
  handleFieldUpdate: Function,
  handleBlur: Function,
  handleChange: (string) => void,
  setFieldValue: (string, any) => void,
  createSnackbar: (React.Element | string) => void,
  createFields: (fields: Array<FieldTemplate>, pageId: number, docId: number) => Promise<CreatePageFieldsResponse>,
  updateFields: (fields: Array<AdaptedField>, docId: number, ?{ deleting: boolean }) => Promise<UpdateDocPageFieldsResponse>,
  createDialog: Function,
  closeDialog: Function,
  documents: Array<EditorDocument>,
  signees: ?Array<?SessionSignee>,
  user: AppUser,
  pdfPages: Object,
  createStampsData: (docId: number, value: string, assignee: string, ?{ isInitials: boolean }) => Promise<Data>,
  createUserStamps: ({ userSignature: UserStampInput, userInitial: UserStampInput }) => Promise<CreateUserStampResponse>,
  signatureReferences: { [number]: number },
  initialsReferences: { [number]: number },
  refetchUser: Function,
  setUser: Function,
  signeeCheck: (checkAllSigneesHaveField: Function) => void,
};

type State = {
  activeSelectionPageFields: Array<number>,
  activeSelectionRelPos: { [number]: { x: number, y: number } },
  activeSelectionBox: { left: number, top: number },
  activePage: number,
  floatingFieldType: ?string,
  pages: Array<AdaptedPage>,
  zoom: number,
  listScrollTop: any,
  currentSignee: ?string,
  placedSignature: boolean,
  zoomAdjustmentFactor: number,
};

export class TemplateEditorC extends React.PureComponent<PropType, State> {

  state = {
    pages: preparePages(this.props.documents),
    activePage: 0,
    activeSelectionPageFields: [],
    activeSelectionRelPos: {},
    activeSelectionBox: { left: 0, top: 0 },
    floatingFieldType: null,
    zoom: DEFAULT_ZOOM,
    listScrollTop: null,
    currentSignee: this.props.mode === EDITOR_MODE.INSTANCE_PREPARATION && this.props.signees.length ? this.props.signees[0].sessionSigneeName : null,
    placedSignature: false,
    zoomAdjustmentFactor: 1,
  };

  pageManager = new PageManager();

  // Stores all refs from child pages.
  pageRefs = {};

  // Stores React Virtualized scroll values to adjust for zoom.
  listScrollValues = {};

  // fields buffer
  clipboardFields: Array<{
    pageIndex: number,
    pageField: AdaptedField,
    relativeTop: number,
    relativeLeft: number,
  }> = [];

  // colors for color coding
  colorMap = this.props.signees && generateColorMap(
    this.props.signees,
  );

  // current user session signee name
  mySessionSigneeName = (() => {
    const mySessionSignee = this.props.signees && this.props.signees.find(s => s && s.userByUserId && s.userByUserId.email === this.props.user.email);
    return mySessionSignee ? mySessionSignee.sessionSigneeName : null;
  })();

  scaleZoomToFitPage = debounce(() => {
    // If first page of the first document is too wide, adjust the overall zoom.
    if (this.pageListRef) {
      const bufferWidth = 10;
      const { width: pageListWidth } = this.pageListRef.getBoundingClientRect();
      // Grab either actual pagelist width, or, if it's too small, grab the const.
      const referenceWidth = pageListWidth > PAGE_LIST_MIN_WIDTH ? pageListWidth : PAGE_LIST_MIN_WIDTH;
      const zoomAdjustmentFactor = this.props.documents.length
        && this.props.documents[0].pages
        && this.props.documents[0].pages.nodes[0]
        && this.props.documents[0].pages.nodes[0].width
        && (this.props.documents[0].pages.nodes[0].width + (PAGE_SIDE_MARGIN + bufferWidth) * 2) > referenceWidth
        ? (referenceWidth - (PAGE_SIDE_MARGIN + bufferWidth) * 2) / this.props.documents[0].pages.nodes[0].width
        : 1;
      this.setState({
        zoom: DEFAULT_ZOOM * zoomAdjustmentFactor,
        zoomAdjustmentFactor,
      });
    }
  }, 250);

  componentDidMount() {
    this.props.signeeCheck(this.checkAllSigneesHaveField);

    window.addEventListener('resize', this.scaleZoomToFitPage);
    this.scaleZoomToFitPage();
  }

  componentDidUpdate(prevProps: PropType) {
    if (this.props.documents !== prevProps.documents) {
      this.setState({
        pages: preparePages(this.props.documents),
        activePage: 0,
        activeSelectionPageFields: [],
        activeSelectionRelPos: {},
        activeSelectionBox: { left: 0, top: 0 },
        floatingFieldType: null,
        currentSignee: this.props.mode === EDITOR_MODE.INSTANCE_PREPARATION
          && this.props.signees.length ? this.props.signees[0].sessionSigneeName : null,
      });
      this.clearClipboard();
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.scaleZoomToFitPage);
  }

  passPageRefToEditor = (ref: HTMLDivElement, pageIndex: number) => {
    this.pageRefs[pageIndex] = ref;
  };

  setCurrentPageOnMouseMove = (pageIndex: number) => {
    if (pageIndex !== this.state.activePage) {
      this.setState({
        activePage: pageIndex,
      });
      this.pageRefs[pageIndex].focus({ preventScroll: true });
    }
  };

  handleFieldAdd = async (type: string, top: number, left: number, pageIndex: number) => {
    let locTop = top;
    let locLeft = left;
    let defaultFieldHeight;
    let defaultFieldWidth;
    let stampDataReference;
    const { signatureReferences, initialsReferences } = this.props;
    const zoom = this.state.zoom / ZOOM_PRECISION_FACTOR;
    const page = this.state.pages[pageIndex];
    const pageRect = this.pageRefs[pageIndex].getBoundingClientRect();
    switch (type) {
      case c.ItemTypes.CHECKBOX:
        defaultFieldWidth = DEFAULT_CHECKBOX_WIDTH;
        defaultFieldHeight = DEFAULT_CHECKBOX_HEIGHT;
        break;
      case c.ItemTypes.TEXT:
        defaultFieldWidth = DEFAULT_TEXTBOX_WIDTH;
        defaultFieldHeight = DEFAULT_TEXTBOX_HEIGHT;
        break;
      case c.ItemTypes.DATE:
        defaultFieldWidth = DEFAULT_DATE_WIDTH;
        defaultFieldHeight = DEFAULT_DATE_HEIGHT;
        break;
      case c.ItemTypes.SIGNATURE:
        defaultFieldWidth = DEFAULT_SIGNATURE_WIDTH;
        defaultFieldHeight = DEFAULT_SIGNATURE_HEIGHT;
        break;
      case c.ItemTypes.LINE:
        defaultFieldWidth = DEFAULT_LINE_LENGTH;
        defaultFieldHeight = 0;
        break;
      case c.ItemTypes.INITIAL:
        defaultFieldWidth = DEFAULT_INITIAL_WIDTH;
        defaultFieldHeight = DEFAULT_INITIAL_HEIGHT;
        break;
      default:
    }

    // if part of the field is outside of the page, stick it to the page border
    // use non-zoomed pageRect values in calculations
    if ((locTop + defaultFieldHeight) > pageRect.height / zoom) {
      locTop -= ((locTop + defaultFieldHeight) - pageRect.height / zoom);
    }

    if ((locLeft + defaultFieldWidth) > pageRect.width / zoom) {
      locLeft -= ((locLeft + defaultFieldWidth) - pageRect.width / zoom);
    }

    // for signature field, grab the dataReference of the corresponding docData, if it's been created
    if (type === c.ItemTypes.SIGNATURE && this.mySessionSigneeName === this.state.currentSignee) {
      stampDataReference = signatureReferences[page.documentId];
    }

    if (type === c.ItemTypes.INITIAL && this.mySessionSigneeName === this.state.currentSignee) {
      stampDataReference = initialsReferences[page.documentId];
    }

    const field = fieldTemplates[type]({
      x: Math.round(locLeft),
      y: Math.round(locTop),
      assignee: this.state.currentSignee,
      // for date field, if the field is assigned to me, get the current date
      dateValue: type === 'date' && this.mySessionSigneeName === this.state.currentSignee ? new Date() : '',
      dataReference: (type === c.ItemTypes.SIGNATURE || type === c.ItemTypes.INITIAL) && stampDataReference,
    });

    this.createNewFields([field], pageIndex);
    this.pageRefs[pageIndex].focus({ preventScroll: true });
  };

  handleFieldsUpdate = async (fields: Array<AdaptedField>, { sign }: { sign: false } = {}) => {
    const { pages, activePage } = this.state;
    const docId = pages[activePage].documentId;

    const [err, data] = await pro(this.props.updateFields(fields, docId));

    if (err) {
      this.props.createSnackbar(c.CANNOT_UPDATE_FIELD);
    } else {
      if (sign) {
        // if field is being signed, get stampLookupUrl from returned data
        let stampLookupUrlToUse = '';

        if (fields[0].type === c.ItemTypes.SIGNATURE) {
          stampLookupUrlToUse = data.data.fields.signatureFields[0].stampLookupUrl;
        } else {
          stampLookupUrlToUse = data.data.fields.initialFields[0].stampLookupUrl;
        }
        const { pages: updatedPages } = this.pageManager.updateFields(pages, [{ ...fields[0], stampLookupUrl: stampLookupUrlToUse }]);

        this.setState({
          pages: updatedPages,
          placedSignature: true,
        });

        return;
      }

      const { pages: updatedPages } = this.pageManager.updateFields(pages, fields);
      this.setState({
        pages: updatedPages,
      });
    }
  };

  handleFieldResize = async (id: number, width: number, height: number, pageIndex: number) => {
    const { updateFields, createSnackbar } = this.props;
    const { pages, activePage } = this.state;
    const docId = pages[activePage].documentId;
    const originalPages = [...pages];
    const { pages: updatedPages, field } = this.pageManager.updateField(this.state.pages, pageIndex, id, { width, height });

    this.setState({ pages: updatedPages });

    const [err] = await pro(updateFields([field], docId));

    if (err) {
      createSnackbar(c.CANNOT_UPDATE_FIELD);
      this.setState({
        pages: originalPages,
      });
    }
  };

  handleLineFieldUpdate = async (id: number, lineField: LineField, pageIndex: number) => {
    const { updateFields, createSnackbar } = this.props;
    const { pages, activePage } = this.state;
    const {
      x1,
      y1,
      x2,
      y2,
      positionLock,
      strokeThickness,
    } = lineField;

    const originalField = pages[pageIndex].fields[id];
    const updatedFields = {};

    if (positionLock === true || positionLock === false) {
      updatedFields.positionLock = positionLock;
    }
    updatedFields.strokeThickness = strokeThickness;

    if (!originalField.positionLock) {
      updatedFields.x1 = x1;
      updatedFields.y1 = y1;
      updatedFields.x2 = x2;
      updatedFields.y2 = y2;
    }

    const { pages: updatedPages, field } = this.pageManager.updateField(pages, pageIndex, id, updatedFields);

    this.setState({ pages: updatedPages });
    const docId = pages[activePage].documentId;
    const [err] = await pro(updateFields([field], docId));

    if (err) {
      createSnackbar(c.CANNOT_UPDATE_FIELD);
      this.setState({
        pages: [...pages],
      });
    }
  };

  handleFieldsDelete = async (ids: ?Array<number>) => {
    const { pages, activeSelectionPageFields, activePage } = this.state;
    const docId = pages[activePage].documentId;

    // if ids been passed explicitly, use them, otherwise use activeSelection ids
    const idsToRemove = ids && ids.length ? ids : activeSelectionPageFields;

    const fields = [];

    idsToRemove.forEach((id) => {
      const field = pages[activePage].fields[id];
      fields.push(field);
    });
    const { pages: updatedPages } = this.pageManager.removeFields(pages, (activePage), idsToRemove);
    const [err] = await pro(this.props.updateFields(fields, docId, { deleting: true }));

    if (err) {
      this.props.createSnackbar(c.CANNOT_DELETE_FIELD);
    } else {
      this.setState({
        pages: updatedPages,
      });
      this.handleActiveSelectionClear();
    }
  };

  handleActiveSelectionRemove = (pageFieldId: number) => {

    const { activeSelectionPageFields, activeSelectionRelPos } = this.state;
    const newActiveSelectionPageFields = activeSelectionPageFields.filter(activeSelectionPageField => activeSelectionPageField !== pageFieldId);

    this.setState({
      activeSelectionPageFields: newActiveSelectionPageFields,
      activeSelectionRelPos: update(activeSelectionRelPos, { $unset: [pageFieldId] }),
    });
  };

  handleActiveSelectionClear = () => {
    this.setState({
      activeSelectionPageFields: [],
      activeSelectionRelPos: {},
      activeSelectionBox: { top: 0, left: 0 },
    });
  };

  // moving fields on the page or between pages
  // moveFieldId: id of field being moved
  // newY, newX - new coordinates relative to page top/left
  // sourcePageIndex: number of the page fields are being moved from
  // targetPageIndex: number of the page fields are being moved to
  // optionally it checks boundaries on move
  handleActiveSelectionMove = async (
    movedFieldId: number,
    newX: number,
    newY: number,
    sourcePageIndex: number,
    targetPageIndex: number,
    { checkBoundaries }: { checkBoundaries: boolean } = {},
  ) => {
    const {
      pages, activeSelectionBox, activeSelectionPageFields, activeSelectionRelPos, activePage,
    } = this.state;

    // Do not move fields between documents IDs, as it is currently unsupported by backend.
    // TODO: decide if we will allow movement between documents. Will require BE update.
    if (pages[targetPageIndex].documentId !== pages[sourcePageIndex].documentId) {
      return;
    }

    // ignore locked fields
    const activeSelectionPageFieldsToMove = activeSelectionPageFields.filter(id => !pages[sourcePageIndex].fields[id].positionLock);

    const { updateFields, createSnackbar } = this.props;

    const originalActiveSelectionBox = { ...activeSelectionBox };
    const originalPages = [...pages];
    const movedField = pages[sourcePageIndex].fields[movedFieldId];

    let newPages = {};
    let newActiveSelectionBox = {};
    let moveFields = [];
    let canMove = true;

    let moveDifference = {
      x: 0,
      y: 0,
    };

    // if moved field is of type line - get move difference b/w old and new line rectangles
    if (movedField.type === 'line') {
      const { x, y } = getLineRectangle(movedField.x1 || 0, movedField.y1 || 0, movedField.x2 || 0, movedField.y2 || 0);
      moveDifference = {
        x: newX - x,
        y: newY - y,
      };
    } else {
      moveDifference = {
        x: newX - (movedField.x || 0),
        y: newY - (movedField.y || 0),
      };
    }

    const adjustedZoom = this.state.zoom / ZOOM_PRECISION_FACTOR;

    if (sourcePageIndex === targetPageIndex) {

      if (checkBoundaries) {
        canMove = checkMoveBoundaries(
          pages,
          this.pageRefs,
          targetPageIndex,
          movedFieldId,
          activeSelectionPageFieldsToMove,
          activeSelectionRelPos,
          activeSelectionBox,
          adjustedZoom,
          newX * adjustedZoom,
          newY * adjustedZoom,
        );

        if (!canMove) {
          return;
        }
      }

      const { pages: updatedPages, fields } = this.pageManager.moveFields(
        pages, sourcePageIndex, moveDifference.x, moveDifference.y, activeSelectionPageFieldsToMove,
      );

      newActiveSelectionBox = {
        top: activeSelectionBox.top + moveDifference.y,
        left: activeSelectionBox.left + moveDifference.x,
      };
      newPages = updatedPages;
      moveFields = fields;

    } else {
      if (checkBoundaries) {
        canMove = checkMoveBoundaries(
          pages,
          this.pageRefs,
          targetPageIndex,
          movedFieldId,
          activeSelectionPageFieldsToMove,
          activeSelectionRelPos,
          activeSelectionBox,
          adjustedZoom,
          newX * adjustedZoom,
          newY * adjustedZoom,
          { sourcePageIndex },
        );

        if (!canMove) {
          return;
        }
      }

      const { pages: updatedPages, fields } = this.pageManager.moveFieldsBetweenPages(
        pages, sourcePageIndex, targetPageIndex, moveDifference.x, moveDifference.y, activeSelectionPageFieldsToMove,
      );
      newActiveSelectionBox = {
        top: newY - activeSelectionRelPos[movedFieldId].y,
        left: newX - activeSelectionRelPos[movedFieldId].x,
      };
      newPages = updatedPages;
      moveFields = fields;
    }

    this.setState({
      pages: newPages,
      activeSelectionBox: newActiveSelectionBox,
    });

    const docId = pages[activePage].documentId;
    const [err] = await pro(updateFields(moveFields, docId));

    if (err) {
      createSnackbar(c.CANNOT_UPDATE_FIELD);
      this.setState({
        pages: originalPages,
        activeSelectionBox: originalActiveSelectionBox,
      });
    }

  };

  handlePageClick = (ev: SyntheticMouseEvent<HTMLBaseElement>, pageIndex: number) => {
    const pageRect = this.pageRefs[pageIndex].getBoundingClientRect();
    const type = this.state.floatingFieldType;
    if (type) {
      this.handleFieldAdd(
        type,
        (ev.clientY - pageRect.top) / (this.state.zoom / ZOOM_PRECISION_FACTOR),
        (ev.clientX - pageRect.left) / (this.state.zoom / ZOOM_PRECISION_FACTOR),
        pageIndex,
      );
    }
    this.setState({ floatingFieldType: null });
  };

  updateFloatingFieldType = (floatingFieldType: string) => {
    this.setState({ floatingFieldType });
  };

  handleSelectedFieldsDuplicate = () => {
    this.copyFieldsToClipboard(this.state.activePage);
    const adjustedZoom = this.state.zoom / ZOOM_PRECISION_FACTOR;
    this.handleClipboardFieldsPaste(
      (this.state.activeSelectionBox.left + DUPLICATION_OFFSET) * adjustedZoom,
      (this.state.activeSelectionBox.top + DUPLICATION_OFFSET) * adjustedZoom,
    );
  };

  clearClipboard = () => {
    this.clipboardFields = [];
  };

  copyFieldsToClipboard = (pageIndex: number) => {
    const { pages } = this.state;
    this.clearClipboard();

    const newClipboardFields = [];
    if (this.state.activeSelectionPageFields.length) {
      this.state.activeSelectionPageFields.forEach((pageFieldId) => {
        const fieldToCopyPage = pages[pageIndex];
        const fieldToCopy = fieldToCopyPage.fields[pageFieldId];

        newClipboardFields.push({
          pageIndex,
          pageField: fieldToCopy,
          relativeLeft: this.state.activeSelectionRelPos[pageFieldId].x,
          relativeTop: this.state.activeSelectionRelPos[pageFieldId].y,
        });
      });
    }
    this.clipboardFields = newClipboardFields;
  };

  deleteActiveSelectionFields = () => {
    if (this.state.activeSelectionPageFields.length > 1) {
      const selectedFields = this.state.activeSelectionPageFields;
      this.props.createDialog({
        dialogContent: <ConfirmMultiDeleteDialog
          numFields={selectedFields.length}
          onSubmit={() => {
            this.handleFieldsDelete();
          }}
        />,
      });
    }
    if (this.state.activeSelectionPageFields.length === 1) {
      this.handleFieldsDelete();
    }
  };

  addFieldsToSelection = (ids: Array<number>, { resetSelection }: { resetSelection: boolean } = { resetSelection: false }) => {
    const {
      activeSelectionPageFields,
      activeSelectionRelPos,
      activeSelectionBox,
      activePage,
      pages,
    } = this.state;
    const newActiveSelectionPageFields = resetSelection ? [] : [...activeSelectionPageFields];
    const newActiveSelectionPageFieldAbsPos = {};

    newActiveSelectionPageFields.forEach((fieldId) => {
      newActiveSelectionPageFieldAbsPos[fieldId] = {
        x: activeSelectionRelPos[fieldId].x + activeSelectionBox.left,
        y: activeSelectionRelPos[fieldId].y + activeSelectionBox.top,
      };
    });

    ids.forEach((id) => {
      const field = pages[activePage].fields[id] || {}; // conditional protects against crash in event of field not existing yet
      newActiveSelectionPageFields.push(id);

      const getLineTopLeftCorner = (x1: number, x2: number, y1: number, y2: number) => ({
        x: x1 < x2 ? x1 : x2,
        y: y1 < y2 ? y1 : y2,
      });

      newActiveSelectionPageFieldAbsPos[id] = {
        // in case of line, grab the top/left corner or line rectangle
        x: field.type === 'line' ? getLineTopLeftCorner(field.x1 || 0, field.x2 || 0, field.y1 || 0, field.y2 || 0).x : field.x,
        y: field.type === 'line' ? getLineTopLeftCorner(field.x1 || 0, field.x2 || 0, field.y1 || 0, field.y2 || 0).y : field.y,
      };
    });

    const {
      relativeFieldPositions, activeSelectionLeft, activeSelectionTop,
    } = determineRelativePositions(newActiveSelectionPageFieldAbsPos);

    this.handleActiveSelectionClear();
    this.setState({
      activeSelectionPageFields: newActiveSelectionPageFields,
      activeSelectionRelPos: relativeFieldPositions,
      activeSelectionBox: { left: activeSelectionLeft, top: activeSelectionTop },
    });
  };

  handleClipboardFieldsPaste = (leftWithZoom: number, topWithZoom: number) => {

    // Adjust top and left for zoom
    const top = topWithZoom / (this.state.zoom / ZOOM_PRECISION_FACTOR);
    const left = leftWithZoom / (this.state.zoom / ZOOM_PRECISION_FACTOR);

    const { activePage, pages } = this.state;
    const page = pages[activePage];
    const pageWidth = page.width || 0;
    const pageHeight = page.height || 0;

    const newFields = [];
    const shifts = {
      xIncrease: 0,
      xDecrease: 0,
      yIncrease: 0,
      yDecrease: 0,
    };
    this.clipboardFields.forEach((clipboardField) => {
      const fieldToCopy = clipboardField.pageField;

      let width = 0;
      let height = 0;
      if (fieldToCopy.type === 'line') {
        // in case of line get the height and width of the rectangle formed by line
        const {
          x1, y1, x2, y2,
        } = fieldToCopy;
        height = Math.abs((y1 || 0) - (y2 || 0));
        width = Math.abs((x1 || 0) - (x2 || 0));
      } else {
        ({ width, height } = fieldToCopy);
      }

      const minY = (top + clipboardField.relativeTop);
      if ((minY < 0) && (shifts.yIncrease < minY)) {
        shifts.yIncrease = -minY;
      }
      const minX = (left + clipboardField.relativeLeft);
      if ((minX < 0) && (shifts.xIncrease < minX)) {
        shifts.xIncrease = -minX;
      }
      const maxY = (top + clipboardField.relativeTop + height);
      if ((maxY > pageHeight) && (shifts.yDecrease > pageHeight - maxY)) {
        shifts.yDecrease = pageHeight - maxY;
      }
      const maxX = (left + clipboardField.relativeLeft + width);
      if ((maxX > pageWidth) && (shifts.xDecrease > pageWidth - maxX)) {
        shifts.xDecrease = pageWidth - maxX;
      }

    });

    if (!(shifts.xIncrease > 0 && shifts.xDecrease < 0) || !(shifts.yIncrease > 0 && shifts.yDecrease < 0)) {
      this.clipboardFields.forEach((clipboardField) => {
        const fieldToCopy = clipboardField.pageField;

        const newTop = top + clipboardField.relativeTop + shifts.yIncrease + shifts.yDecrease;
        const newLeft = left + clipboardField.relativeLeft + shifts.xIncrease + shifts.xDecrease;
        newFields.push(this.cloneField(
          fieldToCopy,
          activePage,
          newTop,
          newLeft,
        ));

      });
    }
    this.createNewFields(newFields, activePage);
  };

  cloneField = (field: AdaptedField, pageIndex: number, newTop: number, newLeft: number) => {
    if (field.type === 'line') {
      const {
        fieldName, x2, y2, x1, y1, strokeThickness, color,
      } = field;
      const oldTop = (y1 || 0) < (y2 || 0) ? y1 : y2;
      const oldLeft = (x1 || 0) < (x2 || 0) ? x1 : x2;
      const moveDifference = { x: newLeft - (oldLeft || 0), y: newTop - (oldTop || 0) };

      return fieldTemplates.line({
        name: `${fieldName || ''}-Copy`,
        x: Math.round(x1 + moveDifference.x),
        y: Math.round(y1 + moveDifference.y),
        x2: Math.round(x2 + moveDifference.x),
        y2: Math.round(y2 + moveDifference.y),
        strokeThickness,
        color,
        positionLock: field.positionLock || false,
      });
    }

    const {
      type, fieldName, width, height, dataReference,
    } = field;

    const { documentId } = this.state.pages[pageIndex];
    const data = this.props.values[documentId] && this.props.values[documentId][(dataReference || -1)];

    return fieldTemplates[type]({
      name: `${fieldName || ''}-Copy`,
      y: Math.round(newTop),
      x: Math.round(newLeft),
      width: width || 0,
      height: height || 0,
      dataReference,
      assignee: field.assignee || '',
      data,
      positionLock: field.positionLock || false,
    });
  };

  createNewFields = async (newFields: Array<FieldTemplate>, pageIndex: number) => {
    const {
      createFields, createSnackbar, addValues,
    } = this.props;
    const { currentSignee } = this.state;

    const currentPage = this.state.pages[pageIndex];
    const numFields = Object.keys(currentPage.fields).length;
    if ((numFields + newFields.length) >= MAX_FIELDS_PER_PAGE) {
      createSnackbar(c.NO_MORE_FIELDS);
      return;
    }

    const { tempIds, pages: newPages } = this.pageManager.addTemporaryFields(this.state.pages, newFields, pageIndex);
    this.setState({ pages: newPages });

    const { documentId } = currentPage;
    const [err, fields] = await pro(createFields(newFields, this.state.pages[pageIndex].id, documentId));

    if (err || !fields) {
      createSnackbar(c.CANNOT_ADD_FIELD);
      const { pages } = this.pageManager.removeFields(this.state.pages, pageIndex, tempIds);
      this.setState({ pages });
      return;
    }
    const adaptedFields = adaptFields(get(fields, 'data.fields', {}), pageIndex);

    if (adaptedFields) {
      const newIds = [];
      const dataFields = {};
      const { pages } = this.pageManager.addFields(
        this.state.pages,
        adaptedFields,
        pageIndex,
        tempIds,
      );
      adaptedFields.forEach((adaptedField) => {
        const {
          id,
          dataReference,
          type,
        } = adaptedField;
        newIds.push(id);
        // adding value to the document editor
        if (dataReference && adaptedField.dataByDataReference && type !== 'line') {
          dataFields[dataReference] = {
            ...generateDataFieldByType(type, dataReference),
            value: adaptedField.dataByDataReference.value,
            assignee: currentSignee,
          };
        } else if (dataReference) {
          dataFields[dataReference] = { ...generateDataFieldByType(type, dataReference), assignee: currentSignee };
        }
      });

      addValues(dataFields, documentId);

      this.setState({
        pages,
        activeSelectionPageFields: [],
        activeSelectionRelPos: {},
        activeSelectionBox: { top: 0, left: 0 },
      }, () => {
        this.addFieldsToSelection(newIds);
      });
    }
  };

  handleUpdateZoom = (addValue: number) => {
    const { zoom, zoomAdjustmentFactor } = this.state;
    let newZoom = zoom + addValue * zoomAdjustmentFactor;

    if (newZoom <= ZOOM_MINIMUM * zoomAdjustmentFactor) {
      newZoom = ZOOM_MINIMUM * zoomAdjustmentFactor;
    }
    if (newZoom >= ZOOM_MAXIMUM * zoomAdjustmentFactor) {
      newZoom = ZOOM_MAXIMUM * zoomAdjustmentFactor;
    }

    // If zoom changed, set scroll and setState
    if (newZoom !== zoom) {
      const adjustScrollByPercent = (zoom + addValue * zoomAdjustmentFactor) / zoom;

      // Temporarily set new scroll position so React Virtualized List uses it to set scrollTop inside List.
      this.setState({
        listScrollTop: adjustScrollByPercent * (this.listScrollValues.scrollTop),
      });

      this.setState({ zoom: newZoom });

      // Reset listScrollTop after scrollTop has updated so that React Virtualized List does not
      // stick to the same position.
      setTimeout(() => {
        this.setState({
          listScrollTop: null,
        });
      }, REACT_VIRTUALIZED_SCROLLTOP_UPDATE_TIME);
    }
  };

  storeListScrollValues = (items: Object) => {
    this.listScrollValues = items;
  };

  onCurrentSigneeChange = (signeeName: string) => {
    this.setState({ currentSignee: signeeName });
  };

  // Checks that all signees have at least one field assigned to them before proceeding.
  checkAllSigneesHaveField = () => {
    const { signees, createSnackbar } = this.props;

    if (!signees) {
      return true;
    }

    // signeeUnverifiedMap is a list of all signees. We have not yet verified
    // if they all have fields assigned to them in the document.
    const signeeUnverifiedMap = {};

    signees.forEach((signee) => {
      if (signee && signee.sessionSigneeName) {
        signeeUnverifiedMap[signee.sessionSigneeName] = true;
      }
    });

    if (!this.state.pages) {
      // Editor state and pages should always be present.
      createSnackbar(c.CANNOT_COMPLETE_SIGNING);
      return false;
    }

    // Iterate through all pages and fields.
    // As you find assignees, delete corresponding keys in signeeUnverifiedMap.
    // Break when signeeUnverifiedMap has no keys so you don't need to iterate
    // over all fields.
    let signeesVerified = false;
    const { pages } = this.state;
    const pagesLength = pages.length;
    for (let i = 0; i < pagesLength; i += 1) {
      if (signeesVerified) {
        break;
      }

      const page = pages[i];
      const fieldKeys = Object.keys(page.fields);
      const fieldKeysLength = fieldKeys.length;
      for (let j = 0; j < fieldKeysLength; j += 1) {
        if (signeesVerified) {
          break;
        }

        const fieldKey = fieldKeys[j];
        const field = page.fields[Number(fieldKey)];
        const assigneeToVerify = (field && field.assignee) || undefined;

        // Look for signee in map.
        if (assigneeToVerify && signeeUnverifiedMap[String(assigneeToVerify)]) {
          // If found, remove from map.
          delete signeeUnverifiedMap[String(assigneeToVerify)];
          // Check if there are no more keys.
          // Can break from loop and continue if there are no more keys.
          if (Object.keys(signeeUnverifiedMap).length === 0) {
            signeesVerified = true;
            break;
          }
        }
      }
    }

    let canProceed = true;
    if (Object.keys(signeeUnverifiedMap).length > 0) {
      // TODO: popup.
      canProceed = window.confirm('You have one or more signees that don’t have any fields assigned to them. Continue?',); // eslint-disable-line
    }

    return canProceed;
  }

  pageListRef: React.Element;

  render() {
    const {
      classes,
      mode,
      documents,
      signees,
      pdfPages,
      user,
      ...restProps
    } = this.props;
    const {
      pages,
      activeSelectionPageFields,
      activeSelectionRelPos,
      activeSelectionBox,
      floatingFieldType,
      activePage,
      zoom,
      listScrollTop,
      currentSignee,
      placedSignature,
      zoomAdjustmentFactor,
    } = this.state;

    const currentUser = signees && signees.find(signee => signee && signee.userId === user.id);
    const uName = currentUser && currentUser.sessionSigneeName;

    return (
      <React.Fragment>
        <Toolbar
          zoom={zoom}
          floatingFieldType={floatingFieldType}
          updateFloatingFieldType={this.updateFloatingFieldType}
          mode={mode}
          handleUpdateZoom={this.handleUpdateZoom}
          signees={signees}
          currentSignee={currentSignee}
          onSigneeChange={this.onCurrentSigneeChange}
          colorMap={this.colorMap}
          zoomAdjustmentFactor={zoomAdjustmentFactor}
        />
        {
          mode === EDITOR_MODE.TEMPLATE_DRAFT
          && (
            <Banner>
              You are currently editing a draft of a form template. Users won&#39;t see the changes until it&#39;s published.
            </Banner>
          )
        }
        <div className={classes.panels}>
          <div
            className={classNames(classes.formPanel, classes.panel)}
            ref={(r) => {
              if (!this.pageListRef) {
                this.pageListRef = r;
              }
            }}
          >
            {
              pages
              && (
                <PageList
                  {...restProps}
                  signees={signees}
                  colorMap={this.colorMap}
                  pdfPages={pdfPages}
                  listScrollTop={listScrollTop}
                  storeListScrollValues={this.storeListScrollValues}
                  pages={pages}
                  activePage={activePage}
                  activeSelectionPageFields={activeSelectionPageFields}
                  activeSelectionRelPos={activeSelectionRelPos}
                  activeSelectionBox={activeSelectionBox}
                  setCurrentPageOnMouseMove={this.setCurrentPageOnMouseMove}
                  addFieldsToSelection={this.addFieldsToSelection}
                  deleteActiveSelectionFields={this.deleteActiveSelectionFields}
                  copyFieldsToClipboard={this.copyFieldsToClipboard}
                  handleFieldsDelete={this.handleFieldsDelete}
                  handleFieldResize={this.handleFieldResize}
                  handleLineFieldUpdate={this.handleLineFieldUpdate}
                  handleFieldAdd={this.handleFieldAdd}
                  handleActiveSelectionClear={this.handleActiveSelectionClear}
                  handleActiveSelectionMove={this.handleActiveSelectionMove}
                  handleActiveSelectionRemove={this.handleActiveSelectionRemove}
                  handleClipboardFieldClear={this.clearClipboard}
                  handleClipboardFieldsPaste={this.handleClipboardFieldsPaste}
                  handleSelectedFieldsDuplicate={this.handleSelectedFieldsDuplicate}
                  handlePageClick={this.handlePageClick}
                  handleFieldsUpdate={this.handleFieldsUpdate}
                  handleUpdateZoom={this.handleUpdateZoom}
                  floatingFieldType={floatingFieldType}
                  updateFloatingFieldType={this.updateFloatingFieldType}
                  zoom={zoom / ZOOM_PRECISION_FACTOR}
                  mode={mode}
                  passPageRefToEditor={this.passPageRefToEditor}
                  pageRefs={this.pageRefs}
                  currentUser={uName}
                  signed={placedSignature ? 1 : 0}
                />
              )
            }
          </div>
          <div className={classNames(classes.attributePanel, classes.panel, 'fieldOutClick')}>
            {
              <AttributesPanel
                zoom={zoom / ZOOM_PRECISION_FACTOR}
                pages={pages}
                activeSelectionPageFields={activeSelectionPageFields}
                handleFieldClone={this.handleSelectedFieldsDuplicate}
                handleFieldUpdate={this.handleFieldsUpdate}
                handleLineFieldUpdate={this.handleLineFieldUpdate}
                pageRefs={this.pageRefs}
                handleDeleteFields={this.deleteActiveSelectionFields}
                mode={mode}
                handleFieldResize={this.handleFieldResize}
                handleActiveSelectionMove={this.handleActiveSelectionMove}
                signees={signees}
              />
            }
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
  withSnackbar,
  withDialog,
  withAppUser,
)(TemplateEditorC);
