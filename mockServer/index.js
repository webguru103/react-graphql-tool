/* eslint-disable import/no-extraneous-dependencies */

import express from 'express';
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import cors from 'cors';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import casual from 'casual';
import { CustomAPIError } from './customGraphqlError';

const schemaString = [fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')];

const port = 10200;

casual.define('role_id', () => casual.random_element([2, 3, 4, 5, 6])); // cp-super-admin, cp-admin, super-admin, admin, agent
casual.define('role_category', () => casual.random_element(['CP_ADMIN', 'ADMIN', 'AGENT']));
casual.define('resource_category', () => casual.random_element(['SYSTEM', 'BROKERAGE'])); // system, brokerage
casual.define('system_id', () => casual.random_element([1, 2, 3])); // cp, admin-panel, agent-panel
casual.define('status', () => casual.random_element(['ACCEPTED', 'REJECTED', 'PENDING']));

const mocks = {
  Time: () => new Date(),
  Query: () => ({
    allInvites: () => ({
      nodes: () => new MockList([1, 1]),
    }),
    checkEmail: () => true,
    checkIdentity: (_, { email }) => {
      if (email.startsWith('error')) {
        throw new CustomAPIError(
          'Error processing the request',
          'server.error',
          'internal',
          409,
        );
      } else {
        return {
          foundUser: casual.boolean,
          emailVerified: true,
          identityExists: false,
        };
      }
    },
  }),
  Mutation: () => ({
    updateField: (_, {
      id, field: {
        text, date, boolean, people,
      },
    }) => ({
      id,
      value: {
        text: text || null,
        date: date || null,
        boolean: boolean || null,
        people: people || null,
      },
    }),
    sendEmail: () => true,
    createUser: (_, {
      user: {
        email, id, phone, firstName, lastName, oreaVerified, oreaGuid,
      },
    }) => {
      if (email.startsWith('error')) {
        throw new CustomAPIError(
          'Cannot Create',
          'cannot.create',
          'user',
          409,
        );
      } else {
        return {
          __typename: 'User',
          id: id || casual.integer(0, 100000),
          email: email || casual.email,
          phone: phone || casual.phone,
          firstName: firstName || casual.first_name,
          lastName: lastName || casual.last_name,
          oreaVerified: oreaVerified || true,
          oreaGuid: oreaGuid || '',
        };
      }
    },
    updateUser: (_, {
      id, user: {
        email, phone, firstName, lastName, oreaVerified, oreaGuid, removeBrokerageAcls,
      },
    }) => {
      if (id === 123) {
        throw new CustomAPIError(
          'Cannot Update',
          'cannot.update',
          'user',
          409,
        );
      } else {
        let brokerageAcls = [
          {
            __typename: 'BrokerageAcl',
          },
        ];
        if (removeBrokerageAcls && removeBrokerageAcls.length) {
          brokerageAcls = [];
        }

        return {
          __typename: 'User',
          id: id || casual.uuid,
          email: email || casual.email,
          phone: phone || casual.phone,
          firstName: firstName || casual.first_name,
          lastName: lastName || casual.last_name,
          oreaVerified: oreaVerified || true,
          oreaGuid: oreaGuid || '',
          brokerageAclsByUserId: {
            nodes: brokerageAcls,
          },
        };
      }
    },

    inviteUser: (_, { invite: { email } }) => {
      if (email.startsWith('already_registered')) {
        throw new CustomAPIError(
          'Can not invite user',
          'already.exists.on.brokerage',
          'user',
          409,
        );
      }
      if (email.startsWith('already_admin')) {
        throw new CustomAPIError(
          'Can not invite admin',
          'already.admin.on.brokerage',
          'user',
          409,
        );
      }
      if (email.startsWith('already_cp')) {
        throw new CustomAPIError(
          'Can not invite user',
          'already.cp.user',
          'user',
          409,
        );
      }
      return true;
    },
    invitedUser: (_, { id }) => {
      if (id === 123) {
        throw new CustomAPIError(
          'Cannot Update',
          'cannot.update',
          'user',
          409,
        );
      }
      return 'ACCEPTED';
    },
  }),

  User: () => ({
    __typename: 'User',
    id: casual.integer(0, 100000),
    password: casual.password,
    email: casual.email,
    firstName: casual.first_name,
    lastName: casual.last_name,
    phone: casual.phone,
    deleted: false,
    unit: casual.integer(0, 100),
    streetNumber: casual.building_number,
    streetName: casual.street,
    city: casual.city,
    province: casual.random_element(['Ontario', 'Alberta', 'British Columbia', 'Quebec', 'Nova Scotia', 'New Brunswick']),
    country: casual.random_element(['Canada', 'United States']),
    postalCode: casual.zip(6),
    createdAt: casual.date('YYYY-MM-DD'),
    updatedAt: casual.date('YYYY-MM-DD'),
    loggedInAt: casual.date('YYYY-MM-DD'),
    passwordChangedAt: casual.date('YYYY-MM-DD'),
    emailVerified: casual.boolean,
    oreaVerified: casual.boolean,
    temporaryToken: casual.uuid,
    brokerageAclsByUserId: () => ({
      nodes: () => new MockList([1, 1]),
    }),
    systemAclsByUserId: () => ({
      nodes: () => new MockList([1, 1]),
    }),
  }),
  Invite: () => {
    let inviteRoleAndResource;
    switch (casual.random_element([1, 2, 3, 4, 5, 6])) {
      case 0: // CP Seed Admin
        inviteRoleAndResource = {
          resourceCategory: 'SYSTEM',
          roleId: 1,
          role: {
            id: 1,
            roleCategory: 'CP_ADMIN',
            roleName: 'CP Seed Admin',
          },
        };
        break;
      case 1: // CP_SUPER_ADMIN
        inviteRoleAndResource = {
          resourceCategory: 'SYSTEM',
          roleId: 2,
          role: {
            id: 2,
            roleCategory: 'CP_ADMIN',
            roleName: 'CP Super Admin',
          },
        };
        break;
      case 2: // CP_ADMIN
        inviteRoleAndResource = {
          resourceCategory: 'SYSTEM',
          roleId: 3,
          role: {
            id: 3,
            roleCategory: 'CP_ADMIN',
            roleName: 'CP Admin',
          },
        };
        break;
      case 3: // SUPER_ADMIN
        inviteRoleAndResource = {
          resourceCategory: 'BROKERAGE',
          roleId: 4,
          role: {
            id: 4,
            roleCategory: 'ADMIN',
            roleName: 'Super Admin',
          },
        };
        break;
      case 4: // ADMIN
        inviteRoleAndResource = {
          resourceCategory: 'BROKERAGE',
          roleId: 5,
          role: {
            id: 5,
            roleCategory: 'ADMIN',
            roleName: 'Admin',
          },
        };
        break;
      case 5: // AGENT
        inviteRoleAndResource = {
          resourceCategory: 'BROKERAGE',
          roleId: 6,
          role: {
            id: 6,
            roleCategory: 'AGENT',
            roleName: 'Agent',
          },
        };
        break;
      default: // ADMIN
        inviteRoleAndResource = {
          resourceCategory: 'BROKERAGE',
          roleId: 5,
          role: {
            id: 5,
            roleCategory: 'ADMIN',
            roleName: 'Admin',
          },
        };
    }
    return {
      __typename: 'Invite',
      ...inviteRoleAndResource,
      id: casual.integer(0, 100000),
      userId: casual.integer(100001, 200000),
      resourceId: casual.integer(200001, 300000),
      requestedById: casual.integer(100001, 200000),
      statusId: 'pending',
      email: casual.email,
      expiry: casual.date('YYYY-MM-DD'),
      createdAt: casual.date('YYYY-MM-DD'),
      updatedAt: casual.date('YYYY-MM-DD'),
      userByUserId: () => casual.user, // Use to check invitedToSignUpNew flow
    };
  },
  SystemAcl: () => {
    let systemAcl;
    switch (casual.random_element([1, 2, 3, 4, 5, 6])) {
      case 0: // CP_SEED_ADMIN
        systemAcl = {
          roleId: 1,
          resourceCategory: 'SYSTEM',
          roleCategory: 'CP_ADMIN',
          systemId: 1,
        };
        break;
      case 1: // CP_SUPER_ADMIN
        systemAcl = {
          roleId: 2,
          resourceCategory: 'SYSTEM',
          roleCategory: 'CP_ADMIN',
          systemId: 1,
        };
        break;
      case 2: // CP_ADMIN
        systemAcl = {
          roleId: 3,
          resourceCategory: 'SYSTEM',
          roleCategory: 'CP_ADMIN',
          systemId: 1,
        };
        break;
      case 3: // SUPER_ADMIN
        systemAcl = {
          roleId: 4,
          resourceCategory: 'SYSTEM',
          roleCategory: 'ADMIN',
          systemId: 2,
        };
        break;
      case 4: // ADMIN
        systemAcl = {
          roleId: 5,
          resourceCategory: 'SYSTEM',
          roleCategory: 'ADMIN',
          systemId: 2,
        };
        break;
      case 5: // AGENT
        systemAcl = {
          roleId: 6,
          resourceCategory: 'SYSTEM',
          roleCategory: 'AGENT',
          systemId: 3,
        };
        break;
      default: // CP_ADMIN
        systemAcl = {
          roleId: 3,
          resourceCategory: 'SYSTEM',
          roleCategory: 'CP_ADMIN',
          systemId: 1,
        };
    }
    return {
      __typename: 'SystemAcl',
      ...systemAcl,
      id: casual.integer(100001, 200000),
      userId: casual.integer(0, 100000),
      resourceId: casual.integer(200001, 300000),
      createdAt: casual.date('YYYY-MM-DD'),
    };
  },
  BrokerageAcl: () => {
    let brokerageAcl;
    switch (casual.random_element([1, 2, 3])) {
      case 0: // SUPER_ADMIN
        brokerageAcl = {
          roleId: 4,
          resourceCategory: 'BROKERAGE',
          roleCategory: 'ADMIN',
        };
        break;
      case 1: // ADMIN
        brokerageAcl = {
          roleId: 5,
          resourceCategory: 'BROKERAGE',
          roleCategory: 'ADMIN',
        };
        break;
      case 2: // AGENT
        brokerageAcl = {
          roleId: 6,
          resourceCategory: 'BROKERAGE',
          roleCategory: 'AGENT',
        };
        break;
      default: // AGENT
        brokerageAcl = {
          roleId: 6,
          resourceCategory: 'BROKERAGE',
          roleCategory: 'AGENT',
        };
    }
    return {
      __typename: 'BrokerageAcl',
      ...brokerageAcl,
      id: casual.integer(100001, 200000),
      userId: casual.integer(0, 100000),
      resourceId: casual.integer(200001, 300000),
      createdAt: casual.date('YYYY-MM-DD'),
    };
  },
  Role: () => {
    let role;
    switch (casual.random_element([1, 2, 3, 4, 5, 6, 7])) {
      case 0: // CP_SEED_ADMIN
        role = {
          id: 1,
          roleCategory: 'CP_ADMIN',
          roleName: 'CP Seed Admin',
        };
        break;
      case 1: // CP_SUPER_ADMIN
        role = {
          id: 2,
          roleCategory: 'CP_ADMIN',
          roleName: 'CP Super Admin',
        };
        break;
      case 2: // CP_ADMIN
        role = {
          id: 3,
          roleCategory: 'CP_ADMIN',
          roleName: 'CP Admin',
        };
        break;
      case 3: // SUPER_ADMIN
        role = {
          id: 4,
          roleCategory: 'ADMIN',
          roleName: 'Super Admin',
        };
        break;
      case 4: // ADMIN
        role = {
          id: 5,
          roleCategory: 'ADMIN',
          roleName: 'Admin',
        };
        break;
      case 5: // AGENT
        role = {
          id: 6,
          roleCategory: 'AGENT',
          roleName: 'Agent',
        };
        break;
      case 6: // CUSTOM ROLE
        role = {
          id: casual.integer(7, 1000),
          roleCategory: casual.role_category,
          roleName: casual.word,
        };
        break;
      default: // CUSTOM ROLE
        role = {
          id: casual.integer(7, 1000),
          roleCategory: casual.role_category,
          roleName: casual.word,
        };
    }
    return {
      __typename: 'Role',
      ...role,
      createdAt: casual.date('YYYY-MM-DD'),
      updatedAt: casual.date('YYYY-MM-DD'),
    };
  },
  RoleCategory: () => casual.role_category,
  ResourceCategory: () => casual.resource_category,
};

const schema = makeExecutableSchema({
  typeDefs: schemaString,
});

addMockFunctionsToSchema({ schema, mocks });

const app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  graphiql: true,
  formatError(err) {
    return {
      ...err,
      message: err.message,
      extensions: err.originalError && err.originalError.extensions,
      path: err.path,
    };
  },
}));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`,
}));

const ws = createServer(app);

ws.listen(port, () => {
  console.log(`GraphQL Server is now running on http://localhost:${port}`);

  new SubscriptionServer({
    execute,
    subscribe,
    schema,
  }, {
    server: ws,
    path: '/subscriptions',
  });
});
