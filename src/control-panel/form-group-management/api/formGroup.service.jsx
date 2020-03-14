import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import getFormGroups from './formGroups.query.graphql';
import createFormGroup from './createFormGroup.mutation.graphql';
import updateFormGroupMutation from './updateFormGroup.mutation.graphql';
import { get } from '../../../utility';
import { DEFAULT_PAGE_SIZE } from '../../../constants';

export const withUpdateFormGroup = (Component: React.Element) => {
  function updateFormGroupHOC(props: any) {
    return (
      <Mutation
        mutation={updateFormGroupMutation}
      >
        {
          ((mutation) => {
            const updateFormGroup = ({ id, formGroup }) => mutation({
              variables: {
                id,
                formGroup,
              },
            });

            return (
              <Component
                {...props}
                updateFormGroup={updateFormGroup}
              />

            );
          })
        }
      </Mutation>
    );
  }

  return updateFormGroupHOC;
};

export const withFormGroups = (Component: React.Element) => function formGroupsHOC(props: any) {
  return (
    <Query
      query={getFormGroups}
      variables={{
        offset: 0,
        first: DEFAULT_PAGE_SIZE,
        orderBy: ['FORM_GROUP_NAME_ASC'],
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
            condition,
            orderBy,
          });

          return (
            <Component
              {...props}
              error={error}
              loading={loading}
              refetch={refetchData}
              formGroups={get(data, 'formGroups.nodes', [])}
              totalCount={get(data, 'formGroups.totalCount', 0)}
            />
          );
        }
      }
    </Query>
  );
};

export const withCreateNewGroup = (Component: React.Element) => {

  function CreateNewGroupHOC(props: any) {
    return (
      <Mutation
        mutation={createFormGroup}
      >
        {
          mutation => (
            <Component
              {...props}
              createNewGroup={({
                formGroupName, visibility,
              }) => mutation({
                variables: {
                  formGroup: {
                    formGroupName,
                    visibility,
                  },
                },
              })}
            />
          )
        }
      </Mutation>
    );
  }

  return CreateNewGroupHOC;
};
