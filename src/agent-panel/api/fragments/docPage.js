import gql from 'graphql-tag';
import { docPageFieldTextFragment } from './docPageFieldText';
import { docPageFieldDateFragment } from './docPageFieldDate';
import { docPageFieldBoolFragment } from './docPageFieldBool';
import type { DocPageFieldText } from './docPageFieldText';
import type { DocPageFieldDate } from './docPageFieldDate';
import { docPageFieldLineFragment } from './docPageFieldLine';
import { docPageFieldInitialFragment } from './docPageFieldInitial';
import { docPageFieldSignatureFragment } from './docPageFieldSignature';
import type { DocPageFieldBool } from './docPageFieldBool';
import type { DocPageFieldSignature } from './docPageFieldSignature';
import type { DocPageFieldInitial } from './docPageFieldInitial';
import type { DocPageFieldLine } from './docPageFieldLine';

export type DocPage = {
  id: number,
  pageNumber?: number,
  width?: number,
  height?: number,
  createdAt?: Date,
  updatedAt?: Date,

  textFields: {
    nodes: Array<?DocPageFieldText>,
    totalCount: number,
  },

  dateFields: {
    nodes: Array<?DocPageFieldDate>,
    totalCount: number,
  },

  boolFields: {
    nodes: Array<?DocPageFieldBool>,
    totalCount: number,
  },

  signatureFields: {
    nodes: Array<?DocPageFieldSignature>,
    totalCount: number,
  },

  initialFields: {
    nodes: Array<?DocPageFieldInitial>,
    totalCount: number,
  },

  lineFields: {
    nodes: Array<?DocPageFieldLine>,
    totalCount: number,
  },
}

export const docPageFragment = gql`
  fragment docPage on DocPage {
    id
    docId
    pageNumber
    width
    height
    createdAt
    updatedAt
    
    textFields: docPageFieldTextsByDocPageId {
      nodes {
        ...docPageFieldText
      }
      totalCount
    }

    dateFields: docPageFieldDatesByDocPageId {
      nodes {
        ...docPageFieldDate
      }
      totalCount
    }
    
    boolFields: docPageFieldBoolsByDocPageId {
      nodes {
        ...docPageFieldBool
      }
      totalCount
    }

    signatureFields: docPageFieldSignaturesByDocPageId {
      nodes {
        ...docPageFieldSignature
      }
      totalCount
    }

    initialFields: docPageFieldInitialsByDocPageId {
      nodes {
        ...docPageFieldInitial
      }
      totalCount
    }

    lineFields: docPageFieldLinesByDocPageId {
      nodes {
        ...docPageFieldLine
      }
      totalCount
    }
    
  } 
  ${docPageFieldTextFragment}
  ${docPageFieldDateFragment}
  ${docPageFieldBoolFragment}
  ${docPageFieldLineFragment}
  ${docPageFieldInitialFragment}
  ${docPageFieldSignatureFragment}
`;
