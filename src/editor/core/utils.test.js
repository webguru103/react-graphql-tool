import {
  TEXTBOX_MIN_HEIGHT,
  TEXTBOX_MIN_WIDTH,
  CHECKBOX_MIN_WIDTH,
  CHECKBOX_MIN_HEIGHT,
  INITIAL_MIN_HEIGHT,
  INITIAL_MIN_WIDTH,
  INITIAL_RATIO,
  SIGNATURE_MIN_HEIGHT,
  SIGNATURE_MIN_WIDTH,
  SIGNATURE_RATIO,
} from '../constants';

import { adjustResizeDimensions } from './utils';

describe('Editor utils', () => {
  it('[adjustResizeDimensions] Provide proper dimensions for textbox', () => {
    expect(adjustResizeDimensions(0, 0, 'text')).toEqual({ newWidth: TEXTBOX_MIN_WIDTH, newHeight: TEXTBOX_MIN_HEIGHT });
    expect(adjustResizeDimensions(9999999, 999999, 'text', { byHeight: true })).toEqual({ newWidth: 9999999, newHeight: 999999 });
    expect(adjustResizeDimensions(TEXTBOX_MIN_WIDTH + 1, TEXTBOX_MIN_HEIGHT + 1, 'text'))
      .toEqual({ newWidth: TEXTBOX_MIN_WIDTH + 1, newHeight: TEXTBOX_MIN_HEIGHT + 1 });
  });

  it('[adjustResizeDimensions] Provide proper dimensions for checkbox', () => {
    expect(adjustResizeDimensions(0, 0, 'checkbox')).toEqual({ newWidth: CHECKBOX_MIN_WIDTH, newHeight: CHECKBOX_MIN_HEIGHT });
    expect(adjustResizeDimensions(CHECKBOX_MIN_WIDTH + 1, CHECKBOX_MIN_HEIGHT + 2, 'checkbox', { byHeight: true }))
      .toEqual({ newWidth: CHECKBOX_MIN_HEIGHT + 2, newHeight: CHECKBOX_MIN_HEIGHT + 2 });
    expect(adjustResizeDimensions(CHECKBOX_MIN_WIDTH + 1, CHECKBOX_MIN_HEIGHT + 2, 'checkbox'))
      .toEqual({ newWidth: CHECKBOX_MIN_WIDTH + 1, newHeight: CHECKBOX_MIN_WIDTH + 1 });
  });

  it('[adjustResizeDimensions] Provide proper dimensions for initial', () => {
    expect(adjustResizeDimensions(0, 0, 'initial')).toEqual({ newWidth: INITIAL_MIN_WIDTH, newHeight: INITIAL_MIN_HEIGHT });
    expect(adjustResizeDimensions(INITIAL_MIN_WIDTH + 1, INITIAL_MIN_HEIGHT + 2, 'initial', { byHeight: true }))
      .toEqual({ newWidth: Math.floor((INITIAL_MIN_HEIGHT + 2) * INITIAL_RATIO), newHeight: INITIAL_MIN_HEIGHT + 2 });
    expect(adjustResizeDimensions(INITIAL_MIN_WIDTH + 1, INITIAL_MIN_HEIGHT + 2, 'initial'))
      .toEqual({ newWidth: INITIAL_MIN_WIDTH + 1, newHeight: Math.floor((INITIAL_MIN_WIDTH + 1) / INITIAL_RATIO) });
  });

  it('[adjustResizeDimensions] Provide proper dimensions for signature', () => {
    expect(adjustResizeDimensions(0, 0, 'signature')).toEqual({ newWidth: SIGNATURE_MIN_WIDTH, newHeight: SIGNATURE_MIN_HEIGHT });
    expect(adjustResizeDimensions(SIGNATURE_MIN_WIDTH + 1, SIGNATURE_MIN_HEIGHT + 2, 'signature', { byHeight: true }))
      .toEqual({ newWidth: Math.round((SIGNATURE_MIN_HEIGHT + 2) * SIGNATURE_RATIO), newHeight: SIGNATURE_MIN_HEIGHT + 2 });
    expect(adjustResizeDimensions(SIGNATURE_MIN_WIDTH + 1, SIGNATURE_MIN_HEIGHT + 2, 'signature'))
      .toEqual({ newWidth: SIGNATURE_MIN_WIDTH + 1, newHeight: Math.floor((SIGNATURE_MIN_WIDTH + 1) / SIGNATURE_RATIO) });
  });

});
