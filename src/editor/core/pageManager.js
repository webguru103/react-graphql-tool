import update from 'immutability-helper/index';
import { randomNegativeInt } from '../../utility';
import type {
  TextField,
  BoolField,
  LineField,
  InitialField,
  AdaptedPage,
  AdaptedLineField,
  AdaptedTextField,
  SignatureField,
  FieldTemplate,
} from './flowTypes';

// helper class to work with template Editor pages datastructure
class PageManager {

  // method is used to add temporary fields on page, before the backend request is being made
  addTemporaryFields = (
    pages: Array<AdaptedPage>, fields: Array<FieldTemplate>, pageIndex: number,
  ) => {
    const newFields = {};
    const tempIds = [];

    fields.forEach((field) => {
      const tempId = randomNegativeInt();
      tempIds.push(tempId);
      newFields[tempId] = {
        ...field,
        id: tempId,
        temporary: true,
        type: field.type,
      };
      return newFields;
    });

    return (
      {
        tempIds,
        pages: update(
          pages,
          {
            [pageIndex]: { fields: { $merge: { ...newFields } } },
          },
        ),
      }
    );
  };

  addFields = (
    pages: Array<AdaptedPage>,
    fields: Array<TextField | BoolField | LineField | SignatureField | InitialField>,
    pageIndex: number,
    temporaryIds: ?Array<number | string>,
  ) => {
    const newFields = {};

    fields.forEach((field: TextField | BoolField | InitialField | LineField | SignatureField) => {
      newFields[field.id] = field;
      newFields[field.id].pageIndex = pageIndex;
      return newFields;
    });

    let newPages = update(
      pages,
      {
        [pageIndex]: { fields: { $merge: { ...newFields } } },
      },
    );

    if (temporaryIds) {
      newPages = update(newPages, { [pageIndex]: { fields: { $unset: temporaryIds } } });
    }
    return ({
      pages: newPages,
    });
  };

  removeFields = (pages: Array<AdaptedPage>, pageIndex: number, fieldIds: Array<number>) => {
    const newPageFields = update(pages[pageIndex].fields, { $unset: fieldIds });
    return ({
      pages: update(pages, { [pageIndex]: { fields: { $set: newPageFields } } }),
    });
  };

  moveFields = (pages: Array<AdaptedPage>, pageIndex: number, moveDiffX: number, moveDiffY: number, fieldIds: Array<number>) => {
    let updatedPage = { ...pages[pageIndex] };
    const updatedFields: Array<any> = [];
    fieldIds.forEach((id) => {

      if (pages[pageIndex].fields[id].type === 'line') {
        // helping flow by explicitly typecasting to line type
        const field = ((pages[pageIndex].fields[id]: any): AdaptedLineField);

        updatedPage = update(updatedPage, {
          fields: {
            [id]: {
              x1: { $set: field.x1 + moveDiffX },
              y1: { $set: field.y1 + moveDiffY },
              x2: { $set: field.x2 + moveDiffX },
              y2: { $set: field.y2 + moveDiffY },
            },
          },
        });
      } else {
        const field = ((pages[pageIndex].fields[id]: any): AdaptedTextField);
        updatedPage = update(updatedPage, {
          fields: {
            [id]: {
              x: { $set: field.x + moveDiffX },
              y: { $set: field.y + moveDiffY },
            },
          },
        });
      }
      updatedFields.push({ ...updatedPage.fields[id] });
    });
    return { pages: update(pages, { [pageIndex]: { $set: updatedPage } }), fields: updatedFields };
  };

  moveFieldsBetweenPages = (
    pages: Array<AdaptedPage>,
    sourcePageIndex: number,
    targetPageIndex: number,
    moveDiffX: number,
    moveDiffY: number,
    fieldIds: Array<number>,
  ) => {
    const fieldsToMove = {};

    fieldIds.forEach((id) => {
      if (pages[sourcePageIndex].fields[id].type === 'line') {
        // helping flow by explicitly typecasting to line type
        const field = ((pages[sourcePageIndex].fields[id]: any): AdaptedLineField);

        fieldsToMove[id] = {
          ...field,
          pageIndex: targetPageIndex,
          pageId: pages[targetPageIndex].id,
          x1: field.x1 + moveDiffX,
          y1: field.y1 + moveDiffY,
          x2: field.x2 + moveDiffX,
          y2: field.y2 + moveDiffY,
        };
      } else {
        const field = ((pages[sourcePageIndex].fields[id]: any): AdaptedTextField);
        fieldsToMove[id] = {
          ...field,
          pageIndex: targetPageIndex,
          pageId: pages[targetPageIndex].id,
          x: field.x + moveDiffX,
          y: field.y + moveDiffY,
        };
      }
    });

    const newSourcePage = update(pages[sourcePageIndex], { fields: { $unset: [...fieldIds] } });
    const newTargetPage = update(pages[targetPageIndex], { fields: { $merge: fieldsToMove } });
    const updatedFields: Array<any> = Object.values(fieldsToMove);
    return {
      pages: update(pages, {
        [sourcePageIndex]: { $set: newSourcePage },
        [targetPageIndex]: { $set: newTargetPage },
      }),
      fields: updatedFields,
    };
  };

  // update any field properties
  updateField = (pages: Array<AdaptedPage>, pageIndex: number, fieldId: number, newProps: Object) => ({
    pages: update(pages, {
      [pageIndex]: {
        fields: {
          [fieldId]: {
            $set: {
              ...pages[pageIndex].fields[fieldId],
              ...newProps,
            },
          },
        },
      },
    }),
    field: {
      ...pages[pageIndex].fields[fieldId],
      ...newProps,
    },
  });

  // update any field properties
  // TODO Fix FlowTypes
  updateFields = (pages: Array<AdaptedPage>, fields: Array<*>) => {

    let newPages = [...pages];

    fields.forEach((field) => {
      const { id, pageIndex, ...newProps } = field;

      newPages = update(newPages, {
        [pageIndex]: {
          fields: {
            [id]: {
              $set: {
                ...newPages[pageIndex].fields[id],
                ...newProps,
              },
            },
          },
        },
      });
    });

    return ({
      pages: update(pages, {
        $set: newPages,
      }),
    });
  }

}

export default PageManager;
