const resolvers = {
  Mutation: {
    updateLanguage: (_: Object, { newLanguage }: { newLanguage: string }, { cache }: { cache: Object }) => {
      const data = {
        currentLanguage: {
          __typename: 'CurrentLanguage',
          language: newLanguage,
        },
      };
      cache.writeData({ data });
      return null;
    },
  },
};

export default resolvers;
