import * as React from 'react';
import { Query, Mutation, graphql } from 'react-apollo';
import { get } from '../../../utility';
import getGroupName from './getGroupName.query.graphql';
import getForm from './getForm.query.graphql';
import discardDraft from './discardDraft.mutation.graphql';
import getFormAndVersionByDraft from './getFormAndVersionByDraft.query.graphql';
import getFormAndVersionByPublished from './getFormAndVersionByPublished.query.graphql';
import publishDraftOnForm from './publishDraftOnForm.mutation.graphql';
import getTransactionName from './getTransactionName.query.graphql';
import createPageFieldsMutation from './createPageFields.mutation.graphql';
import updateFieldsMutation from './updatePageFields.mutation.graphql';
import updateFormDataMutation from './updateFormData.mutation.graphql';
import { EDITOR_MODE } from '../../../editor/constants';

export const withGroupName = (Component: React.Element) => function GroupNameHOC(props: any) {

  return (
    <Query
      query={getGroupName}
      skip={!props.form}
      variables={{
        condition: {
          id: (props.form) ? props.form.formGroupId : null,
        },
      }}
    >
      {
        ({ data, error }) => (
          <Component
            {...props}
            error={error}
            groupName={get(data, 'groups.nodes.0.formGroupName')}
          />
        )
      }
    </Query>
  );
};

export const withForm = (Component: React.Element) => function FormHOC(props: any) {
  const { location: { search } } = props;
  const urlParams = new URLSearchParams(search);
  return (
    <Query
      query={getForm}
      variables={{
        condition: {
          id: urlParams.get('formId'),
        },
        textCondition: {
          deleted: false,
        },
        boolCondition: {
          deleted: false,
        },
        dateCondition: {
          deleted: false,
        },
        signatureCondition: {
          deleted: false,
        },
        initialCondition: {
          deleted: false,
        },
        lineCondition: {
          deleted: false,
        },
      }}
    >
      {
        ({ data, error }) => (
          <Component
            {...props}
            error={error}
            form={get(data, 'forms.nodes.0')}
          />
        )
      }
    </Query>
  );
};

export const withPublishDraftOnForm = (Component: React.Element) => {
  function PublishDraftOnFormHOC(props: any) {
    return (
      <Mutation
        mutation={publishDraftOnForm}
      >
        {
          mutate => (
            <Component
              {...props}
              publishForm={({ id }) => mutate({
                variables: {
                  id,
                },
              })}
            />
          )
        }
      </Mutation>
    );
  }
  return PublishDraftOnFormHOC;
};

export const withDiscardDraft = (Component: React.Element) => {
  function DiscardDraftHOC(props: any) {
    return (
      <Mutation
        mutation={discardDraft}
      >
        {
          mutate => (
            <Component
              {...props}
              discardDraft={({ id }) => mutate({
                variables: {
                  id,
                },
              })}
            />
          )
        }
      </Mutation>
    );
  }
  return DiscardDraftHOC;
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

export const withCreateFields = (Component: React.Element) => function CreateFieldsHOC(props: any) {
  return (
    <Mutation
      mutation={createPageFieldsMutation}
    >
      {
        mutate => (
          <Component
            {...props}
            createFields={fields => mutate({
              variables: {
                fields,
              },
            })}
          />
        )
      }
    </Mutation>
  );
};

export const withUpdateFields = (Component: React.Element) => function UpdateFieldHOC(props: any) {
  return (
    <Mutation
      mutation={updateFieldsMutation}
    >
      {
        mutate => (
          <Component
            {...props}
            updateFields={fields => mutate({
              variables: {
                fields,
              },
            })}
          />
        )
      }
    </Mutation>
  );
};

export const withUpdateFormData = (Component: React.Element) => function UpdateFormData(props: any) {
  return (
    <Mutation
      mutation={updateFormDataMutation}
    >
      {
        mutate => (
          <Component
            {...props}
            updateFormData={({ id, fields }) => mutate({
              variables: {
                id,
                fields,
              },
            })}
          />
        )
      }
    </Mutation>
  );
};

export const withFormVersion = (Component: React.Element) => function FormHOC(props: any) {
  const { location: { search }, mode } = props;
  const urlParams = new URLSearchParams(search);

  const formId = urlParams.get('formId');

  let query = getFormAndVersionByDraft;

  // TODO update according the rest of the modes
  if (mode === EDITOR_MODE.TEMPLATE_PUBLISHED
  || mode === EDITOR_MODE.INSTANCE_VIEW
  ) {
    query = getFormAndVersionByPublished;
  }

  return (
    <Query
      query={query}
      variables={{
        condition: {
          id: Number(formId),
        },
        textCondition: {
          deleted: false,
        },
        boolCondition: {
          deleted: false,
        },
        dateCondition: {
          deleted: false,
        },
        signatureCondition: {
          deleted: false,
        },
        initialCondition: {
          deleted: false,
        },
        lineCondition: {
          deleted: false,
        },
      }}
      fetchPolicy="no-cache"
    >
      {
        ({ data, error, refetch }) => (
          <Component
            {...props}
            error={error}
            form={get(data, 'forms.nodes.0')}
            refetch={refetch}
          />
        )
      }
    </Query>
  );
};
