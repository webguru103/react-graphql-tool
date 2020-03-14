import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ROLE_CATEGORY } from '../../constants';
import type { RoleType } from '../../flowTypes';

type PropType = {
  role: RoleType,
  brokerageName?: string,
}

const SignUpAsC = ({ role: { roleCategory, roleName }, brokerageName }: PropType) => (
  <React.Fragment>
    {
      roleCategory === ROLE_CATEGORY.AGENT
      && brokerageName
      && (
        <FormattedMessage
          id="sign-up-agent"
          defaultMessage="Agent of {brokerageName}"
          values={{
            brokerageName,
          }}
        />
      )
    }
    {
      (roleCategory === ROLE_CATEGORY.ADMIN)
      && brokerageName
      && (
        <FormattedMessage
          id="sign-up-admin"
          defaultMessage="{roleName} of {brokerageName}"
          values={{
            roleName,
            brokerageName,
          }}
        />
      )
    }
    {
      (roleCategory === ROLE_CATEGORY.CP_ADMIN)
      && (
        <FormattedMessage id="sign-up-cp-user" defaultMessage="Control Panel User" />
      )
    }
  </React.Fragment>
);

SignUpAsC.defaultProps = {
  brokerageName: '',
};

export default SignUpAsC;
