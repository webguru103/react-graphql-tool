import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { docPageFieldsFragment } from '../fragments/docPageFields';
import type { DocPageFields } from '../fragments/docPageFields';

type DocDataInput = {
  docDataName?: string,
  affectsSignature: boolean,
  required: boolean,
  minLen?: number,
  maxLen?: number,
}

type DocPageFieldInput = {
  fieldName?: string,
  docId: number,
  docPageId: number,
  deleted: boolean,
  positionLock: boolean,
  color?: string,
}

export type DocPageFieldTextInput = {
  ...$Exact<DocPageFieldInput>,
  assignee: string,
  autocomplete: boolean,
  x: number,
  y: number,
  width: number,
  height: number,
  fontSize?: number,
  alignment?: string,
  padding?: number,
  lineHeight?: number,
  docDataValue: string,
  docDataInput: DocDataInput,
}

export type DocPageFieldDateInput = {
  ...$Exact<DocPageFieldInput>,
  assignee: string,
  autoPopulate: boolean,
  x: number,
  y: number,
  width: number,
  height: number,
  fontSize?: number,
  alignment?: string,
  padding?: string,
  lineHeight?: string,
  docDataValue: string,
  docDataInput: DocDataInput,
}

export type DocPageFieldBoolInput = {
  ...$Exact<DocPageFieldInput>,
  docFieldGroupId?: number,
  assignee: string,
  x: number,
  y: number,
  width: number,
  height: number,
  docDataValue: string,
  docDataInput: DocDataInput,
}

export type DocPageFieldInitialInput = {
  ...$Exact<DocPageFieldInput>,
  assignee: string,
  x: number,
  y: number,
  width: number,
  height: number,
}

export type DocPageFieldSignatureInput = {
  ...$Exact<DocPageFieldInput>,
  assignee: string,
  x: number,
  y: number,
  width: number,
  height: number,
}

export type DocPageFieldLineInput = {
  ...$Exact<DocPageFieldInput>,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  strokeThickness: number,
}

export type DocPageFieldsInput = {
  docId: number,
  docPageFieldTexts?: Array<?DocPageFieldTextInput>,
  docPageFieldDates?: Array<?DocPageFieldDateInput>,
  docPageFieldBools?: Array<?DocPageFieldBoolInput>,
  docPageFieldInitials?: Array<?DocPageFieldInitialInput>,
  docPageFieldSignatures?: Array<?DocPageFieldSignatureInput>,
  docPageFieldLines?: Array<?DocPageFieldLineInput>,
}

export type CreatePageFieldsResponse = {
  data: {
    fields: ?DocPageFields,
  }
}

const createDocPageFields = gql`
  mutation createDocPageFields($fields: DocPageFieldsInput!) {
    fields: createDocPageFields(fields: $fields) {
      ...docPageFields
    }
  }
  ${docPageFieldsFragment}
`;

const createDocPageFieldsOptions = {
  props: ({ mutate }) => ({
    createDocPageFields: input => mutate({
      variables: {
        ...input,
      },
    }),
  }),
};

export default (graphql(createDocPageFields, createDocPageFieldsOptions): React.Element);
