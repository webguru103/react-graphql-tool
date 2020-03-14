import omit from 'lodash.omit';
import type { AdaptedField, FieldTemplate } from '../../editor/core/flowTypes';

export const prepareCreateFieldsResponse = (
  fields: Array<FieldTemplate>, targetPageId: number, formVersionId: number,
) => {
  const pageFieldTexts = [];
  const pageFieldDates = [];
  const pageFieldBools = [];
  const pageFieldSignatures = [];
  const pageFieldLines = [];
  const pageFieldInitials = [];

  fields.forEach((field) => {

    if (field.type === 'line') {
      const { type, ...rest } = field;
      pageFieldLines.push({
        ...rest,
        formVersionId,
        formPageId: targetPageId,
      });
    } else if (field.type === 'signature' || field.type === 'initial') {
      const {
        // $FlowFixMe field is not a line here
        type, ...rest
      } = field;

      if (type === 'signature') {
        pageFieldSignatures.push({
          ...rest,
          formVersionId,
          formPageId: targetPageId,
          formDataValue: '', // TODO formDataValue for signature is obsolete
          formDataInput: {
            required: false,
            affectsSignature: false,
          },
        });
      }

      if (type === 'initial') {
        pageFieldInitials.push({
          ...rest,
          formVersionId,
          formPageId: targetPageId,
          formDataValue: '', // TODO obsolete
          formDataInput: {
            required: false,
            affectsSignature: false,
          },
        });
      }
    } else {
      const {
        // $FlowFixMe field is not a line
        type, dataValue, dataInput: { dataName, ...restDataInput }, ...rest
      } = field;
      if (field.type === 'text') {
        pageFieldTexts.push({
          ...rest,
          formVersionId,
          formPageId: targetPageId,
          formDataValue: dataValue,
          formDataInput: {
            ...restDataInput,
            formDataName: dataName,
          },
        });
      }

      if (field.type === 'checkbox') {
        pageFieldBools.push({
          ...rest,
          formVersionId,
          formPageId: targetPageId,
          formDataValue: dataValue,
          formDataInput: {
            ...restDataInput,
            formDataName: dataName,
          },
        });
      }

      if (field.type === 'date') {
        pageFieldDates.push({
          ...rest,
          formVersionId,
          formPageId: targetPageId,
          formDataValue: dataValue,
          formDataInput: {
            ...restDataInput,
            formDataName: dataName,
          },
        });
      }
    }

  });

  return ({
    pageFieldTexts,
    pageFieldDates,
    pageFieldBools,
    pageFieldSignatures,
    pageFieldInitials,
    pageFieldLines,
  });
};

export const prepareUpdateFieldsResponse = (fields: Array<AdaptedField>, deleting?: boolean) => {
  const pageFieldTexts = [];
  const pageFieldDates = [];
  const pageFieldBools = [];
  const pageFieldSignatures = [];
  const pageFieldLines = [];
  const pageFieldInitials = [];

  fields.forEach((field) => {
    const cleanedField = omit(
      field,
      [
        'pageIndex',
        'pageNumber',
        'type',
        'temporary',
        '__typename',
        'createdAt',
        'updatedAt',
        'dataReference',
        'formDataByDataReference',
        'pageId',
      ],
    );

    if (field.type === 'line') {
      pageFieldLines.push({
        ...cleanedField,
        formPageId: field.pageId,
        deleted: deleting,
      });
    }

    if (field.type === 'text') {
      pageFieldTexts.push({
        ...cleanedField,
        formPageId: field.pageId,
        deleted: deleting,
      });
    }

    if (field.type === 'date') {
      pageFieldDates.push({
        ...cleanedField,
        formPageId: field.pageId,
        deleted: deleting,
      });
    }

    if (field.type === 'checkbox') {
      pageFieldBools.push({
        ...cleanedField,
        formPageId: field.pageId,
        deleted: deleting,
      });
    }

    if (field.type === 'initial') {
      pageFieldInitials.push({
        ...cleanedField,
        formPageId: field.pageId,
        deleted: deleting,
      });
    }

    if (field.type === 'signature') {
      pageFieldSignatures.push({
        ...cleanedField,
        formPageId: field.pageId,
        deleted: deleting,
      });
    }
  });

  return ({
    pageFieldTexts,
    pageFieldDates,
    pageFieldBools,
    pageFieldSignatures,
    pageFieldInitials,
    pageFieldLines,
  });
};
