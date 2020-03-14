import { get } from '../../src/utility';

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

  it('should return default value if input object is null', () => {
    const mockObj = null;
    expect(get(mockObj, 'a', 1)).toEqual(1);
    const mockObj1 = { a: null };
    expect(get(mockObj1, 'a.b', 1)).toEqual(1);
  });

  it('should return the default value if the last element is null', () => {
    const mockObj = { a: { b: null } };
    expect(get(mockObj, 'a.b', 'defaultValue')).toEqual('defaultValue');
  });
});
