import type {
  AdaptedPage,
  LineAttributes,
  LineAttributesInput,
  EditorDocument,
} from './flowTypes';
import {
  CHECKBOX_MIN_HEIGHT,
  CHECKBOX_MAX_HEIGHT,
  TEXTBOX_MIN_HEIGHT,
  TEXTBOX_MAX_HEIGHT,
  SIGNATURE_MIN_WIDTH,
  SIGNATURE_MIN_HEIGHT,
  SIGNATURE_RATIO,
  SIGNATURE_MAX_HEIGHT,
  SIGNATURE_MAX_WIDTH,
  TEXTBOX_MIN_WIDTH,
  TEXTBOX_MAX_WIDTH,
  CHECKBOX_MIN_WIDTH,
  CHECKBOX_MAX_WIDTH,
  CHECKBOX_RATIO,
  INITIAL_RATIO,
  INITIAL_MIN_WIDTH,
  INITIAL_MIN_HEIGHT,
  INITIAL_MAX_WIDTH,
  INITIAL_MAX_HEIGHT,
  LINE_MIN_STROKE_THICKNESS,
  DEFAULT_DOCUMENT_NAME,
} from '../constants';
import { randomId } from '../../utility';
import type { SessionSignee } from '../../agent-panel/api/fragments/sessionSignee';

export const determineRelativePositions = (fieldPos: { [string]: { x: number, y: number }}) => {
  const relativeFieldPositions = {};
  const ids = Object.keys(fieldPos);

  if (ids.length > 0) {
    let left = fieldPos[ids[0]].x;
    let top = fieldPos[ids[0]].y;

    ids.forEach((id) => {
      if (fieldPos[id].x < left) {
        left = fieldPos[id].x;
      }
      if (fieldPos[id].y < top) {
        top = fieldPos[id].y;
      }
    });

    ids.forEach((id) => {
      relativeFieldPositions[id] = {
        x: (fieldPos[id].x - left),
        y: (fieldPos[id].y - top),
      };
    });

    return { relativeFieldPositions, activeSelectionLeft: left, activeSelectionTop: top };
  }
  return { relativeFieldPositions: {}, activeSelectionLeft: 0, activeSelectionTop: 0 };
};

export function adjustLineAttributesForPageSize(pageHeight: number, pageWidth: number, updatedAttributes: LineAttributesInput): LineAttributes {
  const updated = {
    x1: updatedAttributes.x1 || 0,
    y1: updatedAttributes.y1 || 0,
    x2: updatedAttributes.x2 || 0,
    y2: updatedAttributes.y2 || 0,
    strokeThickness: updatedAttributes.strokeThickness || LINE_MIN_STROKE_THICKNESS,
  };

  if (!updated.x1 || updated.x1 < 0) {
    updated.x1 = 0;
  }
  if (updated.x1 && updated.x1 > pageWidth) {
    updated.x1 = pageWidth;
  }

  if (!updated.y1 || updated.y1 < 0) {
    updated.y1 = 0;
  }
  if (updated.y1 && (updated.y1 > pageHeight || (updated.y1 + updated.strokeThickness) > pageHeight)) {
    updated.y1 = pageHeight;
  }

  if (!updated.x2 || updated.x2 < 0) {
    updated.x2 = 0;
  }
  if (updated.x2 && updated.x2 > pageWidth) {
    updated.x2 = pageWidth;
  }

  if (!updated.y2 || updated.y2 < 0) {
    updated.y2 = 0;
  }

  if (updated.y2 && (updated.y2 > pageHeight || (updated.y2 + updated.strokeThickness) > pageHeight)) {
    updated.y2 = pageHeight;
  }

  return updated;
}

// function is used to adjust width/height of the field
// in accordance with ratio and minWidth/minHeight reqs
// by default updates height by provided width, accepts flag to change the behavior
export const adjustResizeDimensions = (width: number, height: number, type: string, { byHeight }: { byHeight: boolean } = { byHeight: false }) => {
  let adjustedWidth = width;
  let adjustedHeight = height;

  let minHeightToUse = TEXTBOX_MIN_HEIGHT;
  let maxHeightToUse = TEXTBOX_MAX_HEIGHT;
  let minWidthToUse = TEXTBOX_MIN_WIDTH;
  let maxWidthToUse = TEXTBOX_MAX_WIDTH;
  let ratioToUse = CHECKBOX_RATIO;

  switch (type) {
    // special case for textbox as it doesn't have ratio lock and we can
    // return immediately
    case 'text':
      adjustedWidth = width < minWidthToUse ? minWidthToUse : width;
      adjustedHeight = height < minHeightToUse ? minHeightToUse : height;
      return {
        newWidth: adjustedWidth,
        newHeight: adjustedHeight,
      };

    case 'checkbox':
      minHeightToUse = CHECKBOX_MIN_HEIGHT;
      minWidthToUse = CHECKBOX_MIN_WIDTH;
      maxHeightToUse = CHECKBOX_MAX_HEIGHT;
      maxWidthToUse = CHECKBOX_MAX_WIDTH;
      ratioToUse = CHECKBOX_RATIO;
      break;

    case 'initial':
      minHeightToUse = INITIAL_MIN_HEIGHT;
      minWidthToUse = INITIAL_MIN_WIDTH;
      maxHeightToUse = INITIAL_MAX_HEIGHT;
      maxWidthToUse = INITIAL_MAX_WIDTH;
      ratioToUse = INITIAL_RATIO;
      break;

    case 'signature':
      minHeightToUse = SIGNATURE_MIN_HEIGHT;
      minWidthToUse = SIGNATURE_MIN_WIDTH;
      maxHeightToUse = SIGNATURE_MAX_HEIGHT;
      maxWidthToUse = SIGNATURE_MAX_WIDTH;
      ratioToUse = SIGNATURE_RATIO;
      break;

    default:
  }

  // deriving width from height if the flag is provided
  if (byHeight) {
    if (height < minHeightToUse) {
      adjustedHeight = minHeightToUse;
    } else if (height > maxHeightToUse) {
      adjustedHeight = maxHeightToUse;
    }

    return {
      newWidth: Math.floor(adjustedHeight * ratioToUse),
      newHeight: adjustedHeight,
    };
  }

  // deriving height from width
  if (width < minWidthToUse) {
    adjustedWidth = minWidthToUse;
  } else if (width > maxWidthToUse) {
    adjustedWidth = maxWidthToUse;
  }

  return {
    newWidth: adjustedWidth,
    newHeight: Math.floor(adjustedWidth / ratioToUse),
  };
};

export const getLineRectangle = (x1: number, y1: number, x2: number, y2: number) => ({
  x: x1 < x2 ? x1 : x2,
  y: y1 < y2 ? y1 : y2,
  width: Math.round(Math.abs(x2 - x1)),
  height: Math.round(Math.abs(y2 - y1)),
});

export const generateColorMap = (signees: Array<?SessionSignee>) => {
  const predefinedMainColors = [
    {
      red: 196, green: 98, blue: 195, alpha: 0.8,
    },
    {
      red: 119, green: 167, blue: 216, alpha: 0.8,
    },
    {
      red: 234, green: 195, blue: 121, alpha: 0.8,
    },
    {
      red: 83, green: 196, blue: 188, alpha: 0.8,
    },
  ];

  const predefinedLightColors = [
    {
      red: 239, green: 213, blue: 239, alpha: 0.8,
    },
    {
      red: 229, green: 236, blue: 244, alpha: 0.8,
    },
    {
      red: 240, green: 230, blue: 211, alpha: 0.8,
    },
    {
      red: 223, green: 242, blue: 240, alpha: 0.8,
    },
  ];

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const colors = [];

  for (let i = 0; i < signees.length; i += 1) {
    if (i < 4) {
      // for first 4 signees grab predefined color
      colors.push({ main: predefinedMainColors[i], light: predefinedLightColors[i] });
    } else {
      // More than 4 signees -> generate random color
      // by 'mixing' in 200 for whiteness
      const red = (getRandomInt(0, 200) + 255) / 2;
      const green = (getRandomInt(0, 200) + 255) / 2;
      const blue = (getRandomInt(0, 200) + 255) / 2;
      const alpha = 0.8;

      // For light version of color mix in more white
      const redLight = (red + 255) / 2;
      const greenLight = (green + 255) / 2;
      const blueLight = (blue + 255) / 2;

      colors.push({
        main: {
          red, blue, green, alpha,
        },
        light: {
          red: redLight, blue: blueLight, green: greenLight, alpha,
        },
      });
    }
  }

  // map color to every signee
  const colorMap = {};

  signees.forEach((signee, idx) => {
    colorMap[(signee && signee.sessionSigneeName) || -1] = colors[idx];
  });

  return colorMap;
};

/**
 * converts pages received from BE into the more convenient to work with structure
 * @returns [{
 *   [id]: Field
 * }]
 */
export const preparePages = (documents: Array<EditorDocument>): Array<AdaptedPage> => {
  const allpages = ([]: Array<AdaptedPage>);

  // Counter for pages added to keep track of pageIndex.
  let pageIndex = 0;

  documents.forEach((document) => {
    document.pages.nodes.forEach((rp) => {
      if (rp) {
        const docName = document.name || `${DEFAULT_DOCUMENT_NAME}-${document.id}`;
        const formattedPage = {
          id: rp.id,
          pageNumber: rp.pageNumber,
          width: rp.width,
          height: rp.height,
          documentId: document.id,
          documentName: docName,
          fields: {},
        };

        rp.textFields.nodes.forEach((tf) => {
          if (tf) {
            formattedPage.fields[tf.id] = {
              ...tf,
              type: 'text',
              pageIndex,
            };
          }
        });

        rp.boolFields.nodes.forEach((bf) => {
          if (bf) {
            formattedPage.fields[bf.id] = {
              ...bf,
              type: 'checkbox',
              pageIndex,
            };
          }
        });

        rp.dateFields.nodes.forEach((df) => {
          if (df) {
            formattedPage.fields[df.id] = {
              ...df,
              type: 'date',
              pageIndex,
            };
          }
        });

        rp.initialFields.nodes.forEach((initf) => {
          if (initf) {
            formattedPage.fields[initf.id] = {
              ...initf,
              type: 'initial',
              pageIndex,
            };
          }
        });

        rp.lineFields.nodes.forEach((lf) => {
          if (lf) {
            formattedPage.fields[lf.id] = {
              ...lf,
              type: 'line',
              pageIndex,
            };
          }
        });

        rp.signatureFields.nodes.forEach((sf) => {
          if (sf) {
            formattedPage.fields[sf.id] = {
              ...sf,
              type: 'signature',
              pageIndex,
            };
          }
        });

        if (formattedPage) {
          allpages.push(formattedPage);
          pageIndex += 1;
        }
      }
    });
  });

  return allpages;
};

export const generateDataFieldByType = (type: string, dataReference?: number) => {
  let dataField = {};
  switch (type) {
    case 'text':
      dataField = {
        dataName: randomId(7),
        affectsSignature: false,
        required: false,
        valueType: 1,
        value: {
          data: [''],
        },
        id: dataReference,
      };
      break;
    case 'checkbox':
      dataField = {
        dataName: randomId(7),
        affectsSignature: false,
        required: false,
        valueType: 2,
        value: {
          data: '',
        },
        id: dataReference,
      };
      break;
    case 'signature':
      dataField = {
        dataName: randomId(7),
        affectsSignature: true,
        required: false,
        valueType: 3,
        value: '',
        id: dataReference,
      };
      break;
    case 'initial':
      dataField = {
        dataName: randomId(7),
        affectsSignature: false,
        required: false,
        valueType: 4,
        value: '',
        id: dataReference,
      };
      break;
    case 'date':
      dataField = {
        dataName: randomId(7),
        affectsSignature: false,
        required: false,
        valueType: 6,
        value: '',
        id: dataReference,
      };
      break;
    default:
      dataField = {
        dataName: randomId(7),
      };
  }
  return dataField;
};
