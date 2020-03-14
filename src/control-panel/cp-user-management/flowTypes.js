export type Address = {
  unit: string,
  streetNumber: string,
  streetName: string,
  city: string,
  province: string,
  postalCode: string,
  country: string,
}

type Brokerage = {
  id: string,
  name: string,
  phone: string,
  fax: string,
  address: Address,
  verified: boolean,
  rejected: boolean,
  createdAt: string,
  updatedAt: string,
}

type Permission = {
  id: string,
  action: string,
  resource: string,
  description: string,
}

type Role = {
  id: string,
  name: string,
  resource: Array<String>,
  permissions: Array<Permission>,
  createdAt: string,
  updatedAt: string,
}

export type User = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  address: Address,
  roles: Array<Role>,
  brokerages: Array<Brokerage>,
  permissions: Array<Permission>,
  createdAt: string,
  updatedAt: string,
  loggedInAt: string,
  passwordChangedAt: string,
  emailVerified: boolean,
  oreaVerified: boolean,
  clientSecret: string,
  oreaGuid: string,
  suspended: boolean,
  invitedBy: string, // TODO check the field
}
