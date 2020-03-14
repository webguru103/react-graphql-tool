export type Person = {
  id: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  role: Object,
}

export type FieldValue = {
  id: string,
  text?: ?string,
  date?: ?Date,
  boolean?: ?Array<boolean>,
  people?: ?Array<Person>,
}

export type Field = {
  id: string,
  name: string,
  tag: string,
  value: FieldValue,
}

export type FieldType = {
  id: string,
  name: string,
}

export type PageFieldField = {
  id: string,
  name: string,
  tag: string,
  type: FieldType,
  erase: Array<string>,
  affects_signature: boolean,
  required: boolean,
  groupIndex?: number,
  dependsOn: Array<string>,
  minLen: number,
  maxLen: number
}

export type PageField = {
  id: string,
  x: number,
  y: number,
  height: number,
  width: number,
  groupIndex: ?number,
  field: PageFieldField,
}

export type GroupPageField = {
  id: string,
  x: number,
  y: number,
  height: number,
  width: number,
  groupIndex: number,
  field: PageFieldField,
}

export type PageType = {
  number: number,
  sourceUrl: string,
  fields: Array<PageField>,
}

export type FormType = {
  id: string,
  name: string,
  pages: Array<PageType>,
}

export type DocumentType = {
  id: string,
  name: string,
  fields: [Field],
  form: FormType,
  createdAt: Date,
  updatedAt: Date,
}
