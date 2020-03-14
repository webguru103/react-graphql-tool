import * as React from 'react';
import uuid from 'uuid';
import { graphql } from 'react-apollo';
import { get } from '../../../utility';
import c from '../constants';
import documentsQuery from './getDocuments.query.graphql';
import addDocumentMutation from './addDocument.mutation.graphql';
import copyDocumentMutation from './copyDocument.mutation.graphql';
import deleteDocumentMutation from './deleteDocument.mutation.graphql';
import getTransactionName from './getTransactionName.query.graphql';

export const withDocuments = (Component: React.Element) => {

  type PropType = {
    data: {
      fetchMore: (Object) => void,
      refetch: (Object) => void,
    }
  };
  function DocumentsHOC({ data, ...rest }: PropType) {

    const onFetchMore = ({ id, page, filter }) => {
      data.fetchMore({
        variables: {
          id,
          pagination: {
            page,
            size: c.DEFAULT_PAGE_SIZE,
            filters: filter !== '' ? [{ field: 'name', value: filter }] : [],
            sorts: [{ field: 'name', desc: true }],
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (get(fetchMoreResult, 'transaction.documents.list', []).length === 0) return prev;
          return Object.assign({}, {
            ...prev,
            transaction: {
              ...prev.transaction,
              documents: {
                ...prev.transaction.documents,
                list: [...prev.transaction.documents.list, ...fetchMoreResult.transaction.documents.list],
              },
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
        transactionName={get(data, 'transaction.name')}
        documents={get(data, 'transaction.documents.list', [])}
        onFilter={onFilter}
        {...rest}
      />
    );

  }

  DocumentsHOC.displayName = Component.displayName;

  return (graphql(documentsQuery, {
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.transactionId,
        pagination: {
          page: 0,
          size: c.DEFAULT_PAGE_SIZE,
          filters: [],
          sorts: [{ field: 'name', desc: true }],
        },
      },
    }),
  })(DocumentsHOC): React.Element);
};

export const withAddDocument = (Component: React.Element) => {
  type PropType = {
    addDocument: (Object) => void,
  };

  function AddDocumentHOC({ addDocument, ...rest }: PropType) {
    const addDocumentMethod = ({ transactionId, document }) => {
      addDocument({
        variables: {
          transactionId,
          revisionId: document.id,
        },
        update: (cache) => {
          const data = cache.readQuery({
            query: documentsQuery,
            variables: {
              id: transactionId,
            },
          });

          data.transaction.documents.list = [
            {
              ...document,
              id: uuid(),
              __typename: 'Document',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            ...data.transaction.documents.list,
          ];

          cache.writeQuery({
            query: documentsQuery,
            data,
          });
        },
      });
    };

    return (
      <Component
        addDocument={addDocumentMethod}
        {...rest}
      />
    );
  }

  AddDocumentHOC.displayName = Component.displayName;

  return (graphql(addDocumentMutation, { name: 'addDocument' })(AddDocumentHOC): React.Element);
};

export const withCopyDocument = (Component: React.Element) => {
  type PropType = {
    copyDocumentApollo: (Object) => void,
  }

  function CopyDocumentHOC({ copyDocumentApollo, ...rest }: PropType) {

    const copyDocumentMethod = ({ id, transactionId }) => {
      copyDocumentApollo({
        variables: {
          id,
        },
        update: (cache, { data: { copyDocument } }) => {
          const data = cache.readQuery({
            query: documentsQuery,
            variables: {
              id: transactionId,
            },
          });

          data.transaction.documents.list.push({
            ...copyDocument,
            name: `Copy of ${copyDocument.name}`,
          });

          cache.writeQuery({
            query: documentsQuery,
            variables: {
              id: transactionId,
            },
            data,
          });
        },
      });
    };

    return (
      <Component
        copyDocument={copyDocumentMethod}
        {...rest}
      />
    );
  }

  return (graphql(copyDocumentMutation, { name: 'copyDocumentApollo' })(CopyDocumentHOC): React.Element);
};

export const withDeleteDocument = (Component: React.Element) => {
  type PropType = {
    deleteDocumentApollo: (Object) => void,
  };

  function DeleteDocumentHOC({ deleteDocumentApollo, ...restProps }: PropType) {

    const deleteDocumentMethod = async ({ id, transactionId }) => {
      deleteDocumentApollo({
        variables: {
          id,
          document: {
            delete: true,
          },
        },
        update: (cache) => {
          const data = cache.readQuery({
            query: documentsQuery,
            variables: {
              id: transactionId,
            },
          });

          const updatedTransaction = {
            ...data.transaction,
            documents: {
              ...data.transaction.documents,
              list: data.transaction.documents.list.filter(t => t.id !== id),
            },
          };

          cache.writeQuery({
            query: documentsQuery,
            data: {
              transaction: updatedTransaction,
            },
            variables: {
              id: transactionId,
            },
          });
        },
      });
    };

    return (
      <Component
        deleteDocument={deleteDocumentMethod}
        {...restProps}
      />
    );
  }

  DeleteDocumentHOC.displayName = Component.displayName;

  return (graphql(deleteDocumentMutation, { name: 'deleteDocumentApollo' })(DeleteDocumentHOC): React.Element);
};

export const withTransactionName = (Component: React.Element) => {
  type PropType = {
    data: Object,
  };

  function TransactionNameHOC({ data, ...rest }: PropType) {
    return (
      <Component
        transactionName={get(data, 'transaction.name')}
        {...rest}
      />
    );
  }
  TransactionNameHOC.displayName = Component.displayName;

  return (graphql(getTransactionName, {
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.transactionId,
      },
    }),
  })(TransactionNameHOC): React.Element);
};
