export type PageUpload = {
  pageNumber: number,
  url: string,
}

export type DocumentUpload = {
  uuid: string,
  pdf: string,
  pages: Array<PageUpload>
}
