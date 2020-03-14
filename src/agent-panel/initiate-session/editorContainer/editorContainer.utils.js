import omit from 'lodash.omit';
import type { AdaptedField, FieldTemplate } from '../../../editor/core/flowTypes';

export const prepareCreateFieldsResponse = (
  fields: Array<FieldTemplate>, docPageId: number, docId: number,
) => {
  const docPageFieldTexts = [];
  const docPageFieldDates = [];
  const docPageFieldBools = [];
  const docPageFieldSignatures = [];
  const docPageFieldLines = [];
  const docPageFieldInitials = [];

  fields.forEach((field) => {

    if (field.type === 'line') {
      const { type, ...rest } = field;
      docPageFieldLines.push({
        ...rest,
        docId,
        docPageId,
      });
    } else if (field.type === 'signature' || field.type === 'initial') {
      const {
        // $FlowFixMe field is not a line here
        type, ...rest
      } = field;

      if (type === 'signature') {
        docPageFieldSignatures.push({
          ...rest,
          docId,
          docPageId,
        });
      }

      if (type === 'initial') {
        docPageFieldInitials.push({
          ...rest,
          docId,
          docPageId,
        });
      }
    } else {
      const {
        // $FlowFixMe field is not a line here
        type, dataValue, dataInput: { dataName, ...restDataInput }, assignee, ...rest
      } = field;

      if (type === 'text') {
        docPageFieldTexts.push({
          ...rest,
          assignee,
          docId,
          docPageId,
          docDataValue: (Array.isArray(dataValue)) ? dataValue : [dataValue],
          docDataInput: {
            ...restDataInput,
            assignee,
            docId,
            docDataName: dataName,
          },
        });
      }

      if (type === 'date') {
        docPageFieldDates.push({
          ...rest,
          assignee,
          docId,
          docPageId,
          docDataValue: dataValue,
          docDataInput: {
            ...restDataInput,
            assignee,
            docId,
            docDataName: dataName,
          },
        });
      }

      if (type === 'checkbox') {
        docPageFieldBools.push({
          ...rest,
          assignee,
          docId,
          docPageId,
          docDataValue: dataValue,
          docDataInput: {
            ...restDataInput,
            assignee,
            docId,
            docDataName: dataName,
          },
        });
      }
    }
  });

  return ({
    docPageFieldTexts,
    docPageFieldDates,
    docPageFieldBools,
    docPageFieldSignatures,
    docPageFieldInitials,
    docPageFieldLines,
  });
};

export const prepareUpdateFieldsResponse = (fields: Array<AdaptedField>, deleting?: boolean) => {
  const docPageFieldTexts = [];
  const docPageFieldDates = [];
  const docPageFieldBools = [];
  const docPageFieldSignatures = [];
  const docPageFieldLines = [];
  const docPageFieldInitials = [];

  fields.forEach((field) => {
    const cleanedField = omit(
      field,
      [
        'pageIndex',
        'type',
        'temporary',
        '__typename',
        'createdAt',
        'updatedAt',
        'dataByDataReference',
        'pageId',
        'fieldGroupId',
        'stampLookupUrl',
      ],
    );

    if (field.type === 'line') {
      docPageFieldLines.push({
        ...cleanedField,
        docPageId: field.pageId,
        deleted: deleting,
      });
    }

    if (field.type === 'text') {
      docPageFieldTexts.push({
        ...cleanedField,
        docPageId: field.pageId,
        deleted: deleting,
      });
    }

    if (field.type === 'date') {
      docPageFieldDates.push({
        ...cleanedField,
        docPageId: field.pageId,
        deleted: deleting,
      });
    }

    if (field.type === 'checkbox') {
      docPageFieldBools.push({
        ...cleanedField,
        docFieldGroupId: field.fieldGroupId,
        docPageId: field.pageId,
        deleted: deleting,
      });
    }

    if (field.type === 'initial') {
      docPageFieldInitials.push({
        ...cleanedField,
        docPageId: field.pageId,
        deleted: deleting,
      });
    }

    if (field.type === 'signature') {
      docPageFieldSignatures.push({
        ...cleanedField,
        docPageId: field.pageId,
        deleted: deleting,
      });
    }
  });

  return ({
    docPageFieldTexts,
    docPageFieldDates,
    docPageFieldBools,
    docPageFieldSignatures,
    docPageFieldInitials,
    docPageFieldLines,
  });
};
