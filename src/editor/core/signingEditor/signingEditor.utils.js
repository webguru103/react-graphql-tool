import type { EditorDocument } from '../flowTypes';

export const getAlreadySigned = (documents: Array<EditorDocument>, mySigneeName: string) => {

  let alreadySigned = 0;

  documents.forEach((document) => {
    document.pages.nodes.forEach((page) => {
      if (page) {
        page.initialFields.nodes.forEach((initf) => {
          // if field has dataReference, means it was signed
          if ((initf && initf.assignee === mySigneeName) && initf.dataReference) {
            alreadySigned += 1;
          }
        });

        page.signatureFields.nodes.forEach((sf) => {
          if ((sf && sf.assignee === mySigneeName) && sf.dataReference) {
            alreadySigned += 1;
          }
        });
      }
    });
  });

  return alreadySigned;
};
