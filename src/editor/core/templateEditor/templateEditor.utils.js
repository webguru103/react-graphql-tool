import { isDefined } from '../../../utility';
import type {
  AdaptedPage,
  FieldResponse,
} from '../flowTypes';
import { getLineRectangle } from '../utils';

// method is used to convert BE createPageFields response
export const adaptFields = (rawFields: FieldResponse, pageIndex: number) => {

  const textFields = [];
  const dateFields = [];
  const boolFields = [];
  const initialFields = [];
  const lineFields = [];
  const signatureFields = [];

  if (Array.isArray(rawFields.textFields) && rawFields.textFields.length) {
    rawFields.textFields.map(rawTextField => textFields.push({ ...rawTextField, type: 'text', pageIndex }));
  }

  if (Array.isArray(rawFields.dateFields) && rawFields.dateFields.length) {
    rawFields.dateFields.map(rawDateField => dateFields.push({ ...rawDateField, type: 'date', pageIndex }));
  }

  if (Array.isArray(rawFields.boolFields) && rawFields.boolFields.length) {
    rawFields.boolFields.map(rawBoolField => boolFields.push({ ...rawBoolField, type: 'checkbox', pageIndex }));
  }

  if (Array.isArray(rawFields.initialFields) && rawFields.initialFields.length) {
    rawFields.initialFields.map(rawInitialField => initialFields.push({ ...rawInitialField, type: 'initial', pageIndex }));
  }

  if (Array.isArray(rawFields.lineFields) && rawFields.lineFields.length) {
    rawFields.lineFields.map(rawLineField => lineFields.push({ ...rawLineField, type: 'line', pageIndex }));
  }

  if (Array.isArray(rawFields.signatureFields) && rawFields.signatureFields.length) {
    rawFields.signatureFields.map(rawSignatureField => signatureFields.push({ ...rawSignatureField, type: 'signature', pageIndex }));
  }

  return [
    ...textFields,
    ...dateFields,
    ...boolFields,
    ...initialFields,
    ...lineFields,
    ...signatureFields,
  ];
};

export const getFieldPrefix = (fieldType: string) => {
  switch (fieldType) {
    case 'line':
      return 'pageFieldLines';
    case 'checkbox':
      return 'pageFieldBools';
    case 'initial':
      return 'pageFieldInitials';
    case 'signature':
      return 'pageFieldSignatures';
    case 'date':
      return 'pageFieldDates';
    default:
      return 'pageFieldTexts';
  }
};

export const checkMoveBoundaries = (
  pages: Array<AdaptedPage>,
  pageRefs: { [number]: React.Element },
  targetPageIndex: number,
  movingFieldId: number,
  activeSelectionFieldIds: Array<number>,
  relativePositions: { [number]: { x: number, y: number } },
  activeSelectionBox: { top: number, left: number },
  zoom: number,
  newXWithZoom: number, // According to zoom
  newYWithZoom: number, // According to zoom
  {
    sourcePageIndex,
  }: { sourcePageIndex: number } = {},
) => {
  const pageRect = pageRefs[targetPageIndex].getBoundingClientRect();
  const newActiveSelectionBox = {
    x: newXWithZoom - relativePositions[movingFieldId].x * zoom,
    y: newYWithZoom - relativePositions[movingFieldId].y * zoom,
  };
  // find which fields are out of bounds by utilizing fields relative positions

  let canMove = true;
  const activeSelectionLength = activeSelectionFieldIds.length;
  for (let i = 0; i < activeSelectionLength; i += 1) {
    const activeSelectionFieldId = activeSelectionFieldIds[i];
    const pageIndex = isDefined(sourcePageIndex) ? sourcePageIndex : targetPageIndex;
    const field = pages[pageIndex].fields[activeSelectionFieldId];
    const { width, height } = field.type === 'line' ? getLineRectangle(field.x1 || 0, field.y1 || 0, field.x2 || 0, field.y2 || 0) : field;
    if (
      (
        newActiveSelectionBox.x
        + (relativePositions[activeSelectionFieldId].x * zoom)
        + ((width || 0) * zoom)
      ) > pageRect.width
      || (
        newActiveSelectionBox.y
        + (relativePositions[activeSelectionFieldId].y * zoom)
        + ((height || 0) * zoom)
      ) > pageRect.height
      || newActiveSelectionBox.x < 0
      || newActiveSelectionBox.y < 0
    ) {
      canMove = false;
      break;
    }
  }

  return canMove;
};
