type Address = {
  unit: string,
  streetNumber: string,
  streetName: string,
  city: string,
  province: string,
  postalCode: string,
  country: string,
}

export type Brokerage = {
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
