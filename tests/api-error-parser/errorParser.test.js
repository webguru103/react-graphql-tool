import ErrorParser from '../../src/api-error-parser/errorParser';
import {
  mockErrors1, mockErrors2, mockErrorUnknownGlobalKey, mockErrorUnknownFieldKey,
} from './mockErrors';

jest.mock('../../src/api-error-parser/formattedMessages', () => ({
  cannotUpdate: () => 'cannotUpdate',
  invalidData: () => 'invalidData',
  notUnique: () => 'notUnique',
  generic: () => 'generic',
}));

describe('Error Parser', () => {
  const parser = new ErrorParser();

  it('returns empty object if no errors are supplied', () => {
    expect(parser.parse()).toEqual({});
  });

  it('correctly parses error with validations', () => {
    const error = {
      networkError: '',
      graphQLErrors: mockErrors1,
    };

    expect(parser.parse(error)).toEqual({
      global: 'invalidData',
      validations: {
        'brokerage.brokerageName': 'notUnique',
      },
    });
  });

  it('correctly parses error without validations', () => {
    const error = {
      networkError: '',
      graphQLErrors: mockErrors2,
    };

    expect(parser.parse(error)).toEqual({
      global: 'invalidData',
    });
  });

  it('if unknown global key is provided, show generated error', () => {
    const error = {
      networkError: '',
      graphQLErrors: mockErrorUnknownGlobalKey,
    };

    expect(parser.parse(error)).toEqual({
      global: 'A',
    });
  });

  it('if unknown field key is provided, the field level error is skipped', () => {
    const error = {
      networkError: '',
      graphQLErrors: mockErrorUnknownFieldKey,
    };

    expect(parser.parse(error)).toEqual({
      global: 'notUnique',
    });
  });
});
