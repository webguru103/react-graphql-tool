import gql from 'graphql-tag';

export type StampType = 'INITIAL' | 'SIGNATURE';

export type UserStamp = {
  id: number,
  userId?: number,
  stamp?: string,
  stampType?: StampType,
  active?: boolean,
  createdAt?: Date,
}

export const userStampFragment = gql`
  fragment userStamp on UserStamp {
    id
    userId
    stamp
    stampType
    active
    createdAt
  }
`;
