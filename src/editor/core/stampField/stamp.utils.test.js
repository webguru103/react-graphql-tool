import { getWidthHeightFromSVGString } from './stamp.utils';

describe('Stamp utils', () => {
  it('[GET_WIDTH_HEIGHT_FROM_SVG] return correct width and height for correct inputs', () => {
    const base64prefix = 'data:image/svg+xml;base64,';
    const testString1 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="47"></svg>';

    expect(getWidthHeightFromSVGString(base64prefix + btoa(testString1))).toEqual({ width: 30, height: 47 });
  });

  it('[GET_WIDTH_HEIGHT_FROM_SVG] return correct width and height for correct inputs: 2', () => {
    const base64prefix = 'data:image/svg+xml;base64,';
    const testString1 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30.01123" height="47.342344">'
      + '</svg>';

    expect(getWidthHeightFromSVGString(base64prefix + btoa(testString1))).toEqual({ width: 30.01123, height: 47.342344 });
  });

  it('[GET_WIDTH_HEIGHT_FROM_SVG] return null if no width/height is found', () => {
    const base64prefix = 'data:image/svg+xml;base64,';
    const testString1 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ></svg>';

    expect(getWidthHeightFromSVGString(base64prefix + btoa(testString1))).toEqual(null);
  });

  it('[GET_WIDTH_HEIGHT_FROM_SVG] return null if malformed SVG string is passed', () => {
    const base64prefix = 'data:image/svg+xml;base64,';
    const testString1 = 'ABRAHAM LINCOLN';

    expect(getWidthHeightFromSVGString(base64prefix + btoa(testString1))).toEqual(null);
  });

  it('[GET_WIDTH_HEIGHT_FROM_SVG] null is passed, null is returned', () => {
    const testString1 = null;

    expect(getWidthHeightFromSVGString(btoa(testString1))).toEqual(null);
  });

  it('[GET_WIDTH_HEIGHT_FROM_SVG] non-prefixed string is passed', () => {
    const testString1 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ></svg>';

    expect(getWidthHeightFromSVGString(btoa(testString1))).toEqual(null);
  });
});
