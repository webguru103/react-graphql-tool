/* global fixture:true */
import { Selector } from 'testcafe';
import casual from 'casual';
import { cpUser } from '../helpers/users';
import { baseUrl, longTimeout } from '../helpers/constants';

fixture('Form Group')
  .page(`${baseUrl}/login`)
  .beforeEach(async (t) => {
    await t.useRole(cpUser);
    await t.maximizeWindow();
    await t.navigateTo(`${baseUrl}/cp-user/form-manager`);
  });

test('Create a form group that is visible to everyone', async (t) => {
  await t
    .expect(Selector('[data-testid="new-group"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="new-group"]')
    .typeText('[name=groupName]', casual.company_name)
    .click('[data-testid="form-group-visible-everyone"]')
    .click('[data-testid="create-new-form-group"]')
    .expect(Selector('[data-testid="create-new-form-group"]').exists)
    .notOk();
});

test('Create a form group that is visible to OREA', async (t) => {
  await t
    .expect(Selector('[data-testid="new-group"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="new-group"]')
    .typeText('[name=groupName]', casual.company_name)
    .click('[data-testid="form-group-visible-orea"]')
    .click('[data-testid="create-new-form-group"]')
    .expect(Selector('[data-testid="create-new-form-group"]').exists)
    .notOk();
});

test('Create a form group that is visible to No One', async (t) => {
  await t
    .expect(Selector('[data-testid="new-group"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="new-group"]')
    .typeText('[name=groupName]', casual.company_name)
    .click('[data-testid="form-group-visible-no-one"]')
    .click('[data-testid="create-new-form-group"]')
    .expect(Selector('[data-testid="create-new-form-group"]').exists)
    .notOk();
});

test('Rename a form group', async (t) => {
  await t
    .expect(Selector('[data-testid="select"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="select"]')
    .click('[data-value="100"]')
    .expect(Selector('[data-testid="settings-form-group-13931111"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="settings-form-group-13931111"]')
    .typeText('[name=groupName]', casual.company_name, { replace: true })
    .click('[data-testid="submit-button"]')
    .expect(Selector('[data-testid="submit-button"]').exists)
    .notOk();
});

test("Change a form group's visiblity to Everyone", async (t) => {
  await t
    .expect(Selector('[data-testid="select"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="select"]')
    .click('[data-value="100"]')
    .click('[data-testid="settings-form-group-13931111"]')
    .typeText('[name=groupName]', casual.company_name, { replace: true })
    .click('[data-testid="settings-form-group-visible-everyone"]')
    .click('[data-testid="submit-button"]')
    .expect(Selector('[data-testid="submit-button"]').exists)
    .notOk();
});

// TODO: reimplement
// test("Change a form group's visiblity to OREA", async (t) => {
//   await t
//     .expect(Selector('[data-testid="select"]').exists)
//     .ok({ timeout: longTimeout })
//     .click('[data-testid="select"]')
//     .click('[data-value="100"]')
//     .click('[data-testid="settings-form-group-13931111"]')
//     .typeText('[name=groupName]', casual.company_name, { replace: true })
//     .click('[data-testid="settings-form-group-visible-orea"]')
//     .click('[data-testid="submit-button"]')
//     .expect(Selector('[data-testid="submit-button"]').exists)
//     .notOk();
// });

test("Change a form group's visiblity to No One", async (t) => {
  await t
    .expect(Selector('[data-testid="select"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="select"]')
    .click('[data-value="100"]')
    .expect(Selector('[data-testid="settings-form-group-13931111"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="settings-form-group-13931111"]')
    .typeText('[name=groupName]', casual.company_name, { replace: true })
    .click('[data-testid="settings-form-group-visible-no-one"]')
    .click('[data-testid="submit-button"]')
    .expect(Selector('[data-testid="submit-button"]').exists)
    .notOk();
});
