import { IDENTITY, ROLE_CATEGORY } from '../constants';

export function getRedirectPathByRoleCategory(roleCategory: string) {

  let redirectPath = '/';

  if (roleCategory === ROLE_CATEGORY.AGENT) {
    redirectPath = '/agent/sessions';
  } else if (roleCategory === ROLE_CATEGORY.SUPER_ADMIN || roleCategory === ROLE_CATEGORY.ADMIN) {
    redirectPath = '/admin/admin-management';
  } else if (roleCategory === ROLE_CATEGORY.CP_SEED_ADMIN
    || roleCategory === ROLE_CATEGORY.CP_SUPER_ADMIN
    || roleCategory === ROLE_CATEGORY.CP_ADMIN
  ) {
    redirectPath = 'cp-user/brokerage-management';
  }

  return redirectPath;
}

export function getRedirectPathBySelectedIdentity(redirectUrl: ?string, selectedIdentity: string, firstLogin: boolean) {
  if (redirectUrl) {
    return redirectUrl;
  }

  if (selectedIdentity === IDENTITY.CP_USER) {
    return '/cp-user';
  }

  if (selectedIdentity === IDENTITY.ADMIN) {
    return '/admin';
  }

  if (selectedIdentity === IDENTITY.AGENT) {
    if (firstLogin) {
      return '/agent/transactions?popup=true'; // TODO: Fix this, should be on account settings page.
    }
    return '/agent/sessions';
  }

  return '/';
}
