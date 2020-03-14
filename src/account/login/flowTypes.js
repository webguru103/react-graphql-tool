export type AddressType = {
  unit: string,
  streetNumber: string,
  streetName: string,
  city: string,
  province: string,
  postalCode: string,
  country: string,
}

export type RoleType = {
  id: string,
  name: string,
}

export type BrokerageType = {
  id: string,
  name: string,
  address: AddressType,
  phone: string,
  fax: string,
}

export type UserType = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  userRoles: Array<UserRoleType>, // eslint-disable-line
  brokerageInvitation: string,
  brokerages: Array<BrokerageType>,
  loggedInAt: string,
  passwordChangedAt: string,
  oreaVerified: boolean,
  temporaryToken: string,
}

export type UserRoleType = {
  id: string,
  roleCode: string,
  createdAt: string,
  brokerage: BrokerageType,
  role: RoleType,
  user: UserType,
}
