import { isObject, get, bytesToText } from './utility';

describe('isObject', () => {
  test('it works', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject(null)).toBe(false);
  });
});

describe('tests of get utility', () => {
  it('should return default value, if property is not found', () => {
    const mockObj = {};
    expect(get(mockObj, 'a', 1)).toEqual(1);
    expect(get(mockObj, 'a.b.c', 1)).toEqual(1);
  });

  it('should return default value for nested object', () => {
    const mockObj = { a: { b: { c: 'd' } } };
    expect(get(mockObj, 'a.b.e', 'defaultValue')).toEqual('defaultValue');
  });

  it('should work with arrays too', () => {
    const mockObj = { a: [{ b: 1 }] };
    expect(get(mockObj, 'a.0.b')).toEqual(1);
  });
});

describe('bytesToText', () => {
  const b1 = 1;
  const kb1 = 1024;
  const mb1 = 1024 * 1024;
  const gb1 = 1024 * 1024 * 1024;

  // some random values;
  const Kb5B651 = (5 * kb1) + (651 * b1);
  const Mb3Kb234B23 = (3 * mb1) + (234 * kb1) + (23 * b1);
  const Gb10Kb21B113 = (10 * gb1) + (21 * kb1) + (113 * b1);

  it('returns correct values for different input', () => {
    expect(bytesToText(b1)).toEqual('1 B');
    expect(bytesToText(kb1)).toEqual('1.0 KB');
    expect(bytesToText(mb1)).toEqual('1.0 MB');
    expect(bytesToText(gb1)).toEqual('1.0 GB');

    expect(bytesToText(Kb5B651)).toEqual('5.6 KB');
    expect(bytesToText(Mb3Kb234B23)).toEqual('3.2 MB');
    expect(bytesToText(Gb10Kb21B113)).toEqual('10.0 GB');
  });
});
