import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { docPageFieldsFragment } from '../fragments/docPageFields';
import type { DocPageFields } from '../fragments/docPageFields';

type UpdateDocPageFieldInput = {
  id: number,
  fieldName?: string,
  docId?: number,
  docPageId?: number,
  deleted?: boolean,
  positionLock?: boolean,
  color?: string,
}

type UpdateDocPageFieldTextInput = {
  ...$Exact<UpdateDocPageFieldInput>,
  assignee?: string,
  autocomplete?: boolean,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  fontSize?: number,
  alignment?: string,
  padding?: number,
  lineHeight?: number,
}

type UpdateDocPageFieldBoolInput = {
  ...$Exact<UpdateDocPageFieldInput>,
  docFieldGroupId?: number,
  assignee?: string,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

type UpdateDocPageFieldInitialInput = {
  ...$Exact<UpdateDocPageFieldInput>,
  assignee?: string,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

type UpdateDocPageFieldSignatureInput = {
  ...$Exact<UpdateDocPageFieldInput>,
  assignee?: string,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

type UpdateDocPageFieldLineInput = {
  ...$Exact<UpdateDocPageFieldInput>,
  x1?: number,
  y1?: number,
  x2?: number,
  y2?: number,
  strokeThickness?: number,
}

export type UpdateDocPageFieldsInput = {
  docId: number,
  docPageFieldTexts?: Array<?UpdateDocPageFieldTextInput>,
  docPageFieldBools?: Array<?UpdateDocPageFieldBoolInput>,
  docPageFieldInitials?: Array<?UpdateDocPageFieldInitialInput>,
  docPageFieldSignatures?: Array<?UpdateDocPageFieldSignatureInput>,
  docPageFieldLines?: Array<?UpdateDocPageFieldLineInput>,
}

export type UpdateDocPageFieldsResponse = {
  data: {
    fields: ?DocPageFields
  },
}

const updateDocPageFields = gql`
  mutation updateDocPageFields($fields: UpdateDocPageFieldsInput!) {
    fields: updateDocPageFields(fields: $fields) {
      ...docPageFields
    }
  }
  ${docPageFieldsFragment}
`;

const createDocPageFieldsOptions = {
  props: ({ mutate }) => ({
    updateDocPageFields: input => mutate({
      variables: {
        ...input,
      },
    }),
  }),
};

export default (graphql(updateDocPageFields, createDocPageFieldsOptions): React.Element);
