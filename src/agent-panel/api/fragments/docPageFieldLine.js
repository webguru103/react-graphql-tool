import gql from 'graphql-tag';

export type DocPageFieldLine = {
  id: number,
  fieldName?: string,
  pageId?: number,
  deleted?: boolean,
  x1?: number,
  y1?: number,
  x2?: number,
  y2?: number,
  positionLock?: boolean,
  createdAt?: Date,
  updatedAt?: Date,
  color?: string,
  strokeThickness?: number,
};

export const docPageFieldLineFragment = gql`
  fragment docPageFieldLine on DocPageFieldLine {
    id
    fieldName
    pageId: docPageId
    deleted
    x1
    y1
    x2
    y2
    positionLock
    createdAt
    updatedAt
    color
    strokeThickness
  }
`;
