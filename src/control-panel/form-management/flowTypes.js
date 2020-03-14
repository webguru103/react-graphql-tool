// @flow

export type Form = {
  id: string,
  name: string,
  status: string,
  notes: string,
  sourceUrl: string,
  published: boolean,
};

export type PageUpload = {
  pageNumber: number,
  url: string,
}

export type DocumentUpload = {
  uuid: string,
  pdf: string,
  pages: Array<PageUpload>
}
