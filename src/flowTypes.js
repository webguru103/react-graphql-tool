// global flow types

import type { Page } from './editor/core/flowTypes';

export type BrokerageType = {
  id: number,
  brokerageName: string,
  unit: string,
  streetNumber: string,
  streetName: string,
  city: string,
  province: string,
  postalCode: string,
  country: string,
  phone: string,
  fax: string,
  createdAt: string,
  updatedAt: string,
  agentCount: number,
  adminCount: number,
}

export type InviteType = {
  id: number,
  userId: number,
  roleId: number,
  requestedById: number,
  resourceId: number,
  resourceCategory: string,
  roleCatogory: string,
  inviteStatus: string,
  email: string,
  expiry: string,
  userByUserId: UserType, // eslint-disable-line
  roleByRoleId: RoleType, // eslint-disable-line
}

export type InvitesConnectionType = {
  nodes: Array<InviteType>,
  totalCount: number
}

export type RoleType = {
  id: number,
  roleCategory: string,
  roleName: string,
  createdAt: string,
  updatedAt: string,
  invitesByRoleId: InvitesConnectionType,
}

export type UserType = {
  id: number,
  password: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  unit: string,
  streetNumber: string,
  streetName: string,
  city: string,
  province: string,
  postalCode: string,
  country: string,
  createdAt: string,
  updatedAt: string,
  loggedInAt: string,
  passwordChangedAt: string,
  deleted: boolean,
  emailVerified: boolean,
  oreaVerified: boolean,
  temporaryToken: string,
  invitesByUserId: InvitesConnectionType,
  image: string, // TODO check field
  datzUserId: string,
}

export type FormGroup = {
  id: number,
  formGroupName: string,
  visibility: string,
  createdAt: string,
}

export type FormData = {
  id: number,
  formId?: number,
  fieldType?: number,
  formDataName?: string,
  value: {
    data: string | Array<string>
  },
  affectsSignature?: boolean,
  required?: boolean,
  minLen?: number,
  maxLen?: number,
  createdAt?: Date,
  updatedAt?: Date,
}

export type FormVersion = {
  id: number,
  sourceURL?: string,
  pages: {
    nodes: Array<?Page>,
    totalCount: number,
  },
  formData: {
    nodes: Array<?FormData>,
    totalCount: number,
  },
}

export type Form = {
  id: number,
  formName: string,
  formGroupId: number,
  formStatus: string,
  sourceUrl: string,
  publishedAt: string,
  publishedBy: string,
  draftSavedAt: string,
  draftSavedBy: string,
  createdAt: string,
  updatedAt: string,
  draftVersionId: number,
  publishedVersionId: number,
  formVersion: FormVersion,
}

export type Pagination = {
  offset: number,
  first: number,
  orderBy: Array<string>,
  condition: Object,
};
