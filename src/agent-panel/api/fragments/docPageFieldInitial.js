import gql from 'graphql-tag';
import { docDataFragment } from './docData';
import type { DocData } from './docData';

export type DocPageFieldInitial = {
  id: number,
  fieldName?: string,
  pageId?: number,
  deleted?: boolean,
  assignee?: string,
  dataReference?: number,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  positionLock?: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  color?: string,
  stampLookupUrl?: string,

  dataByDataReference?: DocData,
}

export const docPageFieldInitialFragment = gql`
  fragment docPageFieldInitial on DocPageFieldInitial {
    id
    fieldName
    pageId: docPageId
    deleted
    assignee
    dataReference
    x
    y
    width
    height
    positionLock
    createdAt
    updatedAt
    color
    stampLookupUrl
    
    dataByDataReference: docDataByDataReference {
      ...docData
    }
  }
  ${docDataFragment}
`;
