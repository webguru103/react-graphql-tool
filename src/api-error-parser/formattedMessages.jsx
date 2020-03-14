import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  cannotUpdate: (resource: string) => <FormattedMessage id="cannot-update" defaultMessage={'Cannot update {resource}'} values={{ resource }} />,
  invalidData: () => <FormattedMessage id="invalid-data" defaultMessage="Wrong value" />,
  tooShort: (resource: string) => <FormattedMessage id="too-short" defaultMessage={'{resource} is too short'} values={{ resource }} />,
  isEmpty: (resource: string) => <FormattedMessage id="is-empty" defaultMessage={'{resource} is empty'} values={{ resource }} />,
  notUnique: (resource: string) => <FormattedMessage id="not-unique" defaultMessage={'{resource} already exists'} values={{ resource }} />,
  alreadyAdmin: (resource: string) => (
    <FormattedMessage
      id="already-admin"
      defaultMessage={'{resource} already has admin account'}
      values={{ resource: resource.charAt(0).toUpperCase() + resource.slice(1) }}
    />
  ),
  alreadyExistsOn: (model: string, target: string) => (
    <FormattedMessage
      id="already-exists-on"
      defaultMessage={'{model} already exists on {target}'}
      values={{ model: model.charAt(0).toUpperCase() + model.slice(1), target: target.charAt(0).toUpperCase() + target.slice(1) }}
    />
  ),
  alreadyExistsOnBrokerage:
    (resource: number) => (
      <FormattedMessage
        id="already-exists-on-brokerage"
        defaultMessage={'{resource} already belongs to a brokerage'}
        values={{ resource }}
      />
    ),
  passwordInvalid: () => <FormattedMessage id="password-invalid" defaultMessage="Password is invalid" />,

  generic: () => <FormattedMessage id="generic-error" defaultMessage="Some error occurred" />,

  networkErrorMessage: () => <FormattedMessage id="network-error" defaultMessage="Sorry, there was a network error." />,
};
