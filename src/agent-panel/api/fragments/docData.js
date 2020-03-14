import gql from 'graphql-tag';

export type DocData = {
  id: number,
  dataName?: string,
  fieldType?: number,
  value?: {
    data: string | Array<string>
  },
  affectsSignature?: boolean,
  required?: boolean,
  minLen?: number,
  maxLen?: number,
  createdAt?: Date,
  updatedAt?: Date,
};

export const docDataFragment = gql`
  fragment docData on DocData {
    id
    dataName: docDataName
    fieldType
    value
    affectsSignature
    required
    minLen
    maxLen
    createdAt
    updatedAt
  }
`;
