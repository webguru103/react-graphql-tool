/* global fixture:true */
import { Selector, ClientFunction } from 'testcafe';
import casual from 'casual';
import { cpUser } from '../helpers/users';
import { baseUrl, longTimeout } from '../helpers/constants';

fixture('Form')
  .page(`${baseUrl}/login`)
  .beforeEach(async (t)
  => {
    await t.useRole(cpUser);
    await t.maximizeWindow();
    await t.navigateTo(`${baseUrl}/cp-user/form-manager/13931111`);
  });

test('Open a draft form from actions button', async (t) => {
  await t
    .expect(Selector('[data-testid="form-actions-13930"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="form-actions-13930"]')
    .click('[data-testid="edit-draft-13930"]')
    .expect(Selector('[data-testid="textboxTool"]').exists)
    .ok({ timeout: longTimeout });
});

test('Open a published form from actions button', async (t) => {
  await t
    .expect(Selector('[data-testid="form-actions-13930"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="form-actions-13930"]')
    .click('[data-testid="view-published-version-13930"]')
    .expect(Selector('[data-testid="textboxTool"]').exists) // Published Version form's don't have droppable fields.
    .notOk();
});

test('Rename a form from actions button', async (t) => {
  await t
    .expect(Selector('[data-testid="form-actions-13930"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="form-actions-13930"]')
    .click('[data-testid="edit-form-settings-13930"]')
    .typeText('#form-name', casual.title, { replace: true })
    .click('[data-testid="action-dialog-button-bottom"]')
    .expect(Selector('[data-testid="action-dialog-button-bottom"]').exists)
    .notOk();
});

test('Publish form', async (t) => {
  await t
    .expect(Selector('[data-testid="form-actions-13930"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="form-actions-13930"]')
    .click('[data-testid="edit-draft-13930"]')
    .click('[data-testid="publish-form"]')
    .click('[data-testid="publish-button"]')
    .expect(Selector('[data-testid="action-dialog-button-bottom"]').exists)
    .notOk();
});

test('Discard draft', async (t) => {
  await t
    .expect(Selector('[data-testid="form-actions-13930"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="form-actions-13930"]')
    .click('[data-testid="edit-draft-13930"]')
    .dragToElement('[data-testid="textboxTool"]', '[data-testid="droppablePage-0"]', {
      destinationOffsetX: 100,
      destinationOffsetY: 150,
    })
    .click('[data-testid="discard-draft"]')
    .click('[data-testid="discard-button"]')
    .expect(Selector('[data-testid="action-dialog-button-bottom"]').exists)
    .notOk();
});
