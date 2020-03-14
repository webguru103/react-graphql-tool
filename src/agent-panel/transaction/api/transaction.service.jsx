import * as React from 'react';
import { graphql } from 'react-apollo';
import c from '../constants';
import transactionsQuery from './getTransactions.query.graphql';
import addTransactionMutation from './addTransaction.mutation.graphql';
import copyTransactionMutation from './copyTransaction.mutation.graphql';
import deleteTransactionMutation from './deleteTransaction.mutation.graphql';
import renameTransactionMutation from './renameTransaction.mutation.graphql';

export const withTransactions = (Component: React.Element) => {

  type PropType = {
    data: {
      fetchMore: (Object) => void,
      refetch: (Object) => void,
    }
  }

  function TransactionsHOC({ data, ...rest }: PropType) {

    const onFetchMore = ({ page, filter }) => {
      data.fetchMore({
        variables: {
          pagination: {
            page,
            size: c.DEFAULT_PAGE_SIZE,
            filters: filter !== '' ? [{ field: 'name', value: filter }] : [],
            sorts: [{ field: 'name', desc: true }],
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.length === 0) return prev;
          return Object.assign({}, {
            ...prev,
            transactions: {
              ...prev.transactions, list: [...prev.transactions.list, ...fetchMoreResult.transactions.list],
            },
          });
        },
      });
    };

    const onFilter = ({ filter }) => {
      data.refetch({
        pagination: {
          page: 0,
          size: c.DEFAULT_PAGE_SIZE,
          filters: filter !== '' ? [{ field: 'name', value: filter }] : [],
          sorts: [{ field: 'name', desc: true }],
        },
      });
    };

    return (
      <Component
        fetchMore={onFetchMore}
        transactions={data.transactions && data.transactions.list}
        onFilter={onFilter}
        {...rest}
      />
    );
  }

  TransactionsHOC.displayName = Component.displayName;

  return (graphql(transactionsQuery, {
    options: {
      variables: {
        pagination: {
          page: 0,
          size: c.DEFAULT_PAGE_SIZE,
          filters: [],
          sorts: [{ field: 'name', desc: true }],
        },
      },
    },
  })(TransactionsHOC): React.Element);
};

export const withAddTransaction = (Component: React.Element) => {

  type PropType = {
    addTransactionApollo: (Object) => void,
  };

  function AddTransactionHOC({ addTransactionApollo, ...rest }: PropType) {

    const addTransactionMethod = ({ name, ids }) => {
      addTransactionApollo({
        variables: {
          transaction: { name },
          revisionIds: ids,
        },
        update: (cache, { data: { addTransaction } }) => {
          const data = cache.readQuery({
            query: transactionsQuery,
          });

          data.transactions.list.unshift(addTransaction);

          cache.writeQuery({
            query: transactionsQuery,
            data,
          });
        },
      });
    };

    return (
      <Component
        addTransaction={addTransactionMethod}
        {...rest}
      />
    );

  }

  AddTransactionHOC.displayName = Component.displayName;

  return (graphql(addTransactionMutation, { name: 'addTransactionApollo' })(AddTransactionHOC): React.Element);
};

export const withCopyTransaction = (Component: React.Element) => {

  type PropType = {
    copyTransactionApollo: (Object) => void,
  };

  function CopyTransactionHOC({ copyTransactionApollo, ...rest }: PropType) {

    const copyTransactionMethod = ({ id }) => {
      copyTransactionApollo({
        variables: {
          id,
        },
        update: (cache, { data: { copyTransaction } }) => {
          const data = cache.readQuery({
            query: transactionsQuery,
          });

          data.transactions.list.push({
            ...copyTransaction,
            name: `Copy of ${data.transactions.list.filter(t => t.id === id)[0].name}`,
          });

          cache.writeQuery({
            query: transactionsQuery,
            data,
          });
        },
      });
    };

    return (
      <Component
        copyTransaction={copyTransactionMethod}
        {...rest}
      />
    );
  }

  return (graphql(copyTransactionMutation, { name: 'copyTransactionApollo' })(CopyTransactionHOC): React.Element);
};

export const withDeleteTransaction = (Component: React.Element) => {

  type PropType = {
    deleteTransactionApollo: (Object) => void,
  };

  function DeleteTransactionHOC({ deleteTransactionApollo, ...restProps }: PropType) {

    const deleteTransactionMethod = async ({ id }) => {
      deleteTransactionApollo({
        variables: {
          id,
          transaction: {
            delete: true,
          },
        },
        update: (cache) => {
          const data = cache.readQuery({
            query: transactionsQuery,
          });

          const newTransactions = { ...data.transactions, list: data.transactions.list.filter(t => t.id !== id) };

          cache.writeQuery({
            query: transactionsQuery,
            data: { transactions: newTransactions },
          });
        },
      });
    };

    return (
      <Component
        deleteTransaction={deleteTransactionMethod}
        {...restProps}
      />
    );
  }

  DeleteTransactionHOC.displayName = Component.displayName;

  return (graphql(deleteTransactionMutation, { name: 'deleteTransactionApollo' })(DeleteTransactionHOC): React.Element);
};

export const withRenameTransaction = (Component: React.Element) => {

  type PropType = {
    renameTransactionApollo: (Object) => void,
  };

  function RenameTransactionHOC({ renameTransactionApollo, ...rest }: PropType) {
    const renameTransactionMethod = ({ id, newName }) => renameTransactionApollo({
      variables: {
        id,
        transaction: {
          name: newName,
        },
      },
    });

    return (
      <Component
        renameTransaction={renameTransactionMethod}
        {...rest}
      />
    );
  }

  return (graphql(renameTransactionMutation, { name: 'renameTransactionApollo' })(RenameTransactionHOC): React.Element);
};
