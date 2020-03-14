import PageManager from './pageManager';

jest.mock('../../utility', () => ({
  randomNegativeInt: jest.fn(() => -123),
}));

describe('Page Manager', () => {
  const pm = new PageManager();
  it('adds field', () => {
    const pages = [{ fields: { a: { id: 'a' }, b: { id: 'b' } } }];
    const expectedPages = [{ fields: { a: { id: 'a' }, b: { id: 'b' }, c: { id: 'c', pageIndex: 0 } } }];

    expect(pm.addFields(pages, [{ id: 'c' }], 0)).toEqual({ pages: expectedPages });
  });

  it('adds field, and remove temporary field if tempId is provided', () => {
    const pages = [{ fields: { a: { id: 'a' }, b: { id: 'b' }, temp: { id: 'temp' } } }];
    const expectedPages = [{ fields: { a: { id: 'a' }, b: { id: 'b' }, c: { id: 'c', pageIndex: 0 } } }];

    expect(pm.addFields(pages, [{ id: 'c' }], 0, ['temp'])).toEqual({ pages: expectedPages });
  });

  it('adds temporary field', () => {
    const pages = [{ fields: { a: { id: 1 }, b: { id: 2 } } }];
    const expectedPages = [{ fields: { a: { id: 1 }, b: { id: 2 }, [-123]: { id: -123, temporary: true, type: 'text' } } }];

    expect(pm.addTemporaryFields(pages, [{ id: 'c', type: 'text' }], 0)).toEqual({ tempIds: [-123], pages: expectedPages });
  });

  it('removes field', () => {
    const pages = [{ fields: { a: { id: 'a' }, b: { id: 'b' } } }];
    const expectedPages = { pages: [{ fields: { a: { id: 'a' } } }] };

    expect(pm.removeFields(pages, 0, ['b'])).toEqual(expectedPages);
  });

  it('moves field between pages', () => {
    const pages = [{
      fields: {
        a: {
          id: 'a', x: 1, y: 1, pageIndex: 2,
        },
      },
    }, { fields: {} }];
    const expectedResponse = {
      pages: [{ fields: {} }, {
        fields: {
          a: {
            id: 'a', x: 2, y: 2, pageIndex: 1, pageId: undefined,
          },
        },
      }],
      fields: [
        {
          id: 'a', x: 2, y: 2, pageIndex: 1, pageId: undefined,
        },
      ],
    };
    expect(pm.moveFieldsBetweenPages(pages, 0, 1, 1, 1, ['a'])).toEqual(expectedResponse);
  });

  it('moves line between pages', () => {
    const pages = [{
      fields: {
        a: {
          id: 'a', type: 'line', x1: 1, y1: 1, x2: 2, y2: 2, pageIndex: 2,
        },
      },
    }, { fields: {} }];
    const expectedResponse = {
      pages: [{ fields: {} }, {
        fields: {
          a: {
            id: 'a', x1: 2, y1: 2, x2: 3, y2: 3, pageIndex: 1, type: 'line', pageId: undefined,
          },
        },
      }],
      fields: [
        {
          id: 'a', x1: 2, y1: 2, x2: 3, y2: 3, pageIndex: 1, type: 'line', pageId: undefined,
        },
      ],
    };
    expect(pm.moveFieldsBetweenPages(pages, 0, 1, 1, 1, ['a'])).toEqual(expectedResponse);
  });
});
