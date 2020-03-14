import gql from 'graphql-tag';
import { docDataFragment } from './docData';
import type { DocData } from './docData';

export type DocPageFieldText = {
  id: number,
  fieldName?: string,
  pageId?: number,
  deleted?: boolean,
  assignee?: string,
  dataReference?: number,
  autocomplete?: boolean,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  positionLock?: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  color?: string,
  fontSize?: number,
  alignment?: string,
  padding?: number,
  lineHeight?: number,

  dataByDataReference?: DocData,
}

export const docPageFieldTextFragment = gql`
  fragment docPageFieldText on DocPageFieldText {
    id
    fieldName
    pageId: docPageId
    deleted
    assignee
    dataReference
    autocomplete
    x
    y
    width
    height
    positionLock
    createdAt
    updatedAt
    color
    fontSize
    alignment
    padding
    lineHeight

    dataByDataReference: docDataByDataReference {
      ...docData
    }
  }
  ${docDataFragment}
`;
