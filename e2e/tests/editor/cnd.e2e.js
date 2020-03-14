/* global fixture:true */
import { Selector } from 'testcafe';
import { cpUser } from '../helpers/users';
import { baseUrl, longTimeout } from '../helpers/constants';

fixture('Click and drop')
  .page(`${baseUrl}/login`)
  .beforeEach(async (t) => {
    await t.maximizeWindow()
      .useRole(cpUser);
  });

/*
  Textbox Field
*/
test('Click and Drop a textbox', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13901`)
    .expect(Selector('[data-testid="textboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="textboxTool"]')
    .doubleClick('[data-testid="droppablePage-0"]')
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .pressKey('backspace enter delete'); // Cleanup
});

test('Click and Drop a textbox off the page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13902`)
    .expect(Selector('[data-testid="textboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="textboxTool"]')
    .click('[data-testid="pageContainer"]', { offsetX: 0, offsetY: 0 })
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .notOk(); // Assert element does not exist(as expected)
});

test('Click and Drop a textbox to the other page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13903`)
    .expect(Selector('[data-testid="textboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="textboxTool"]')
    .click('[data-testid="droppablePage-1"]')
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .pressKey('backspace enter delete'); // Cleanup
});

/*
  Checkbox Field
*/
test('Click and Drop a checkbox', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13904`)
    .expect(Selector('[data-testid="checkboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="checkboxTool"]')
    .doubleClick('[data-testid="droppablePage-0"]')
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .pressKey('backspace enter delete'); // Cleanup
});

test('Click and Drop a checkbox off the page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13905`)
    .expect(Selector('[data-testid="checkboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="checkboxTool"]')
    .click('[data-testid="pageContainer"]', { offsetX: 0, offsetY: 0 })
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .notOk(); // Assert element does not exist(as expected)
});

test('Click and Drop a checkbox to the other page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13906`)
    .expect(Selector('[data-testid="checkboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="checkboxTool"]')
    .doubleClick('[data-testid="droppablePage-1"]')
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .pressKey('backspace enter delete'); // Cleanup
});

/*
  Signature Field
*/
test('Click and Drop a signature', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13907`)
    .expect(Selector('[data-testid="signatureTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="signatureTool"]')
    .doubleClick('[data-testid="droppablePage-0"]')
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .pressKey('backspace enter delete'); // Cleanup
});

test('Click and Drop a signature off the page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13909`)
    .expect(Selector('[data-testid="signatureTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="signatureTool"]')
    .click('[data-testid="pageContainer"]', { offsetX: 0, offsetY: 0 })
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .notOk(); // Assert element does not exist(as expected)
});

test('Click and Drop a signature to the other page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13909`)
    .expect(Selector('[data-testid="signatureTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="signatureTool"]')
    .doubleClick('[data-testid="droppablePage-1"]')
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .pressKey('backspace enter delete'); // Cleanup
});

/*
  Initial Field
*/
test('Click and Drop an initial', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=139010`)
    .expect(Selector('[data-testid="initialTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="initialTool"]')
    .doubleClick('[data-testid="droppablePage-0"]')
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .pressKey('backspace enter delete'); // Cleanup
});

test('Click and Drop an initial off the page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=139011`)
    .expect(Selector('[data-testid="initialTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="initialTool"]')
    .doubleClick('[data-testid="pageContainer"]', { offsetX: 0, offsetY: 0 })
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .notOk(); // Assert element does not exist(as expected)
});

test('Click and Drop an initial to the other page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=139012`)
    .expect(Selector('[data-testid="initialTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="initialTool"]')
    .doubleClick('[data-testid="droppablePage-1"]')
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .pressKey('backspace enter delete'); // Cleanup
});

/*
  Line Field
*/
test('Click and Drop a line', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=139013`)
    .expect(Selector('[data-testid="lineTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="lineTool"]')
    .doubleClick('[data-testid="droppablePage-0"]')
    .expect(Selector('[data-testid="line-field-container"]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .pressKey('backspace enter delete'); // Cleanup
});

test('Click and Drop a line off the page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=139014`)
    .expect(Selector('[data-testid="lineTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="lineTool"]')
    .doubleClick('[data-testid="pageContainer"]', { offsetX: 0, offsetY: 0 })
    .expect(Selector('[data-testid="line-field-container"]').exists)
    .notOk(); // Assert element does not exist(as expected)
});

test('Click and Drop a line to the other page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=139015`)
    .expect(Selector('[data-testid="lineTool"]').exists)
    .ok({ timeout: longTimeout })
    .click('[data-testid="lineTool"]')
    .doubleClick('[data-testid="droppablePage-1"]')
    .expect(Selector('[data-testid="line-field-container"]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .pressKey('backspace enter delete'); // Cleanup
});

// test('Click and Drop a line on the page edge', async (t) => {
//   await t
//     .click('[data-testid="lineTool"]')
//     .wait(500)
//     .click('[data-testid="droppablePage-0"]', {
//       offsetY: 10,
//     })
//     .expect(Selector('[data-testid="line-field-container"]').exists)
//     .ok({ timeout: longTimeout }) // Assert element exists
//     .pressKey('backspace enter delete'); // Cleanup
// });
