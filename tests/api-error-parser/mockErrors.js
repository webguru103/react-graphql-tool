export const mockErrors1 = [
  {
    message: 'a',
    locations: [{}],
    path: ['a', 'b'],
    extensions: {
      key: 'invalid.data',
      status: 409,
      model: 'brokerage',
      validations: [
        {
          path: 'brokerage.brokerageName',
          key: 'not.unique',
        },
      ],
    },
  },
];

export const mockErrors2 = [
  {
    message: 'a',
    locations: [{}],
    path: ['a', 'b'],
    extensions: {
      key: 'invalid.data',
      status: 409,
      model: 'brokerage',
    },
  },
];

export const mockErrorUnknownGlobalKey = [
  {
    message: 'a',
    locations: [{}],
    path: ['a', 'b'],
    extensions: {
      key: 'api.weirdo',
      status: 409,
      model: 'brokerage',
    },
  },
];

export const mockErrorUnknownFieldKey = [
  {
    message: 'a',
    locations: [{}],
    path: ['a', 'b'],
    extensions: {
      key: 'not.unique',
      status: 409,
      model: 'brokerage',
      validations: [
        {
          path: 'brokerage.brokerageName',
          key: 'api.weirdo',
        },
      ],
    },
  },
];
