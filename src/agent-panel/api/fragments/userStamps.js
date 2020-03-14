import gql from 'graphql-tag';
import { userStampFragment } from './userStamp';
import type { UserStamp } from './userStamp';

export type UserStamps = {
  userSignature: ?UserStamp,
  userInitial: ?UserStamp,
};

export const userStampsFragment = gql`
  fragment userStamps on UserStamps {
    userSignature {
      ...userStamp
    }
    userInitial {
      ...userStamp
    }
  }
  ${userStampFragment}
`;
