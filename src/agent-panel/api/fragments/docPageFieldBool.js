import gql from 'graphql-tag';
import { docDataFragment } from './docData';
import type { DocData } from './docData';

export type DocPageFieldBool = {
  id: number,
  fieldName?: string,
  pageId?: number,
  fieldGroupId?: number,
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

  dataByDataReference?: DocData,
}

export const docPageFieldBoolFragment = gql`
  fragment docPageFieldBool on DocPageFieldBool {
    id
    fieldName
    pageId: docPageId
    fieldGroupId: docFieldGroupId
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

    dataByDataReference: docDataByDataReference {
      ...docData
    }
  }
  ${docDataFragment}
`;
