import { pdfjs } from 'react-pdf/dist/entry.webpack';

class PdfParser {

  constructor(file: File) {
    this.file = file;
  }

  getPdf = (): Promise<Object> => new Promise((res, rej) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const arrayBuffer = new Uint8Array(e.target.result);
      pdfjs.getDocument(arrayBuffer)
        .then(pdf => res(pdf))
        .catch(err => rej(err));
    };

    fileReader.readAsArrayBuffer(this.file);
  });

  file: File;

}

export default PdfParser;
