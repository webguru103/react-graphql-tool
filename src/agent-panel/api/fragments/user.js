import gql from 'graphql-tag';
import { userStampsFragment } from './userStamps';
import type { UserStamps } from './userStamps';

export type User = {
  id: number,
  email: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  unit?: string,
  streetNumber?: string,
  streetName?: string,
  datzUserId?: number,
  oreaVerified?: boolean,

  userStampsByUserId: ?UserStamps

}
export default gql`
  fragment user on User {
    id
    email
    firstName
    lastName
    phone
    unit
    streetNumber
    streetName
    datzUserId
    oreaVerified
    
    userStampsByUserId {
      ...userStamps
    }
  }
  ${userStampsFragment}
`;
