import { Role, Selector } from 'testcafe';

import {
  baseUrl,
  email,
  password,
  longTimeout,
} from './constants';

export const cpUser = Role(`${baseUrl}/login`, async (t) => {
  await t
    .expect(Selector('#email').exists)
    .ok({ timeout: longTimeout })
    .typeText('#email', email)
    .click('[data-testid="next"]')
    .typeText('#password', password)
    .doubleClick('[data-testid="log-in"]')
    .click('[data-testid="go-to-cp"]');
}, { preserveUrl: true });
