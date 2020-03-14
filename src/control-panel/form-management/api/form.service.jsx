import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import getForms from './forms.query.graphql';
import { get } from '../../../utility';
import updateForm from './updateForm.mutation.graphql';
import formGroups from './formGroups.query.graphql';
import getFormGroupName from './getFormGroupName.query.graphql';
import duplicateFormMutation from './duplicateForm.mutation.graphql';
import createFormMutation from './createForm.mutation.graphql';
import { DEFAULT_PAGE_SIZE, FORM_STATUS } from '../../../constants';

export const withCreateForm = (Component: React.Element) => {
  function CreateFormHOC(props: any) {
    return (
      <Mutation mutation={createFormMutation}>
        {
          ((mutation) => {
            const createForm = (
              formInput,
              formVersionInput,
            ) => mutation({
              variables: {
                form: formInput,
                formVersion: formVersionInput,
              },
            });
            return (
              <Component
                {...props}
                createForm={createForm}
              />
            );
          })
        }
      </Mutation>
    );
  }

  return CreateFormHOC;
};

export const withForms = (Component: React.Element) => {
  function formsHOC(props: any) {
    return (
      <Query
        query={getForms}
        variables={{
          offset: 0,
          first: DEFAULT_PAGE_SIZE,
          orderBy: ['FORM_NAME_ASC'],
          condition: {
            formGroupId: Number(get(props, 'match.params.id')),
            formStatus: FORM_STATUS.ACTIVE,
          },
        }}
        fetchPolicy="network-only"
      >
        {
          ({
            data, error, loading, refetch,
          }) => {
            const refetchData = ({
              offset, first, condition, orderBy,
            }) => refetch({
              offset,
              first,
              condition: {
                ...condition,
                formGroupId: Number(get(props, 'match.params.id')),
              },
              orderBy,
            });
            return (
              <Component
                {...props}
                error={error}
                loading={loading}
                refetch={refetchData}
                forms={get(data, 'forms.nodes', [])}
                totalCount={get(data, 'forms.totalCount', 0)}
              />
            );
          }
        }
      </Query>
    );
  }

  formsHOC.displayName = Component.displayName;

  return (withRouter(formsHOC): React.Element);
};

export const withUpdateForm = (Component: React.Element) => {
  function UpdateFormHOC(props: any) {
    return (
      <Mutation
        mutation={updateForm}
      >
        {
          mutate => (
            <Component
              {...props}
              updateForm={({
                id, formName, formGroupId, formStatus,
              }) => mutate({
                variables: {
                  id,
                  form: {
                    formName, formGroupId, formStatus,
                  },
                },
              })}
            />
          )
        }
      </Mutation>
    );
  }
  return UpdateFormHOC;
};

export const withFormGroups = (Component: React.Element) => function FormGroupHOC(props: any) {
  return (
    <Query
      query={formGroups}
    >
      {
        ({ data, error, loading }) => (
          <Component
            {...props}
            formGroups={get(data, 'formGroups.nodes', [])}
            loading={loading}
            error={error}
          />
        )
      }
    </Query>
  );
};

export const withDuplicateForm = (Component: React.Element) => function DuplicateFormHOC(props: any) {
  return (
    <Mutation
      mutation={duplicateFormMutation}
    >
      {
        mutate => (
          <Component
            {...props}
            duplicateForm={({
              id, form, pages, sourceURL,
            }) => {
              if (sourceURL && pages) {
                return mutate({
                  variables: {
                    id,
                    form,
                    formVersion: {
                      sourceURL,
                      formPages: pages,
                    },
                  },
                });
              }

              return mutate({
                variables: {
                  id,
                  form,
                },
              });
            }}
          />
        )
      }

    </Mutation>
  );
};

export const withFormGroupName = (Component: React.Element) => function FormGroupNameHOC(props: any) {
  return (
    <Query
      query={getFormGroupName}
      variables={{
        condition: {
          id: props.match.params.id,
        },
      }}
    >
      {
        ({ data }) => (
          <Component
            formGroupName={get(data, 'formGroups.nodes.0.formGroupName')}
          />
        )
    }
    </Query>
  );
};
