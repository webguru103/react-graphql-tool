import React from 'react';
import SignaturePad from 'signature_pad';

type SignatureCanvasProps = {
  height?: number,
  width?: number,
  clearFunction?: Function,
  downloadFunction?: Function,
  penColor?: string,
  penMaxWidth?: number,
  penMinWidth?: number,
  dataURL?: string,
  onDrawEnd?: (name: ?string, data: string) => void,
  name?: string,
};

export default class SignatureCanvas extends React.Component<SignatureCanvasProps> {

  static defaultProps = {
    width: 400,
    height: 250,
    penColor: '#000000',
    clearFunction: () => {},
    downloadFunction: () => {},
    penMinWidth: 0.75,
    penMaxWidth: 0.75,
  };

  componentDidMount() {
    const {
      clearFunction, downloadFunction, penColor, penMaxWidth, penMinWidth, dataURL,
    } = this.props;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext('2d').scale(ratio, ratio);

    this.signaturePad = new SignaturePad(this.canvas, {
      penColor,
      maxWidth: penMaxWidth,
      minWidth: penMinWidth,
      onEnd: this.onDrawEnd,
    });
    if (clearFunction) {
      clearFunction(this.clear);
    }
    if (downloadFunction) {
      downloadFunction(this.downloadSVG);
    }

    if (dataURL) {
      this.signaturePad.fromDataURL(dataURL);
    }
  }

  componentDidUpdate(prevProps: SignatureCanvasProps) {
    if (prevProps.dataURL !== this.props.dataURL) {
      this.signaturePad.fromDataURL(this.props.dataURL);
    }
  }

  onDrawEnd = () => {
    const { onDrawEnd, name } = this.props;
    if (onDrawEnd) {
      onDrawEnd(name, this.signaturePad.toDataURL('image/svg+xml'));
    }
  };

  clear = () => {
    this.signaturePad.clear();
  };

  downloadSVG = () => {
    const data = this.signaturePad.toDataURL('image/svg+xml');
    const el = document.createElement('a');
    el.style.display = 'none';
    el.setAttribute('href', data);
    el.setAttribute('download', 'canvasDL');
    const { body } = document;
    if (body !== null) {
      body.appendChild(el);
      el.click();
      body.removeChild(el);
    }
  };

  signaturePad: Function;

  canvas: HTMLCanvasElement;

  render() {
    const { width, height } = this.props;
    return (
      <canvas
        id="signature-pad"
        style={{
          width, height,
        }}
        width={width}
        height={height}
        ref={(c) => {
          if (c) {
            this.canvas = c;
          }
        }}
      />
    );
  }

}
