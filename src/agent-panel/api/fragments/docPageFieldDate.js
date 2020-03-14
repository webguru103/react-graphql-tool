import gql from 'graphql-tag';
import { docDataFragment } from './docData';
import type { DocData } from './docData';

export type DocPageFieldDate = {
  id: number,
  fieldName?: string,
  pageId?: number,
  deleted?: boolean,
  assignee?: string,
  dataReference?: number,
  autoPopulate?: boolean,
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
  padding?: string,
  lineHeight?: string,
  dateFormat?: string,

  dataByDataReference?: DocData,
}

export const docPageFieldDateFragment = gql`
  fragment docPageFieldDate on DocPageFieldDate {
    id
    fieldName
    pageId: docPageId
    deleted
    assignee
    dataReference
    autoPopulate
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
`; // TODO ADD DATE FORMAT
