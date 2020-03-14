/* global fixture:true */
import { Selector } from 'testcafe';
import { cpUser } from '../helpers/users';

import { baseUrl, longTimeout } from '../helpers/constants';

fixture('Drag and Drop')
  .page(`${baseUrl}/login`)
  .beforeEach(async (t) => {
    await t.maximizeWindow()
      .useRole(cpUser);
  });

/*
  Textbox Field
*/
test('Drop a textbox', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13911`)
    .expect(Selector('[data-testid="textboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="textboxTool"]', '[data-testid="droppablePage-0"]')
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]')
    .pressKey('backspace enter delete'); // Cleanup
});

test('Drop a textbox off the page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13912`)
    .expect(Selector('[data-testid="textboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="textboxTool"]', '[data-testid="pageContainer"]', {
      destinationOffsetX: 0,
      destinationOffsetY: 0,
    })
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .notOk(); // Assert element does not exist(as expected)
});

// TODO: reimplement
// test('Drop a textbox on the page edge', async (t) => { // Inconsistent breaks
//   await t
//     .dragToElement('[data-testid="textboxTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetY: 5,
//     })
//     .expect(Selector('[data-testid^=fieldWrapper]').exists)
//     .ok({ timeout: longTimeout }) // Assert element exists
//     .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]', { // Cleanup
//       destinationOffsetY: 15,
//     })
//     .pressKey('backspace enter delete'); // Cleanup // Assert element exists
// });

test('Drop a textbox to other page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13913`)
    .expect(Selector('[data-testid="textboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="textboxTool"]', '[data-testid="droppablePage-1"]', {
      destinationOffsetX: 400,
      destinationOffsetY: 450,
    })
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .dragToElement('[data-testid="droppablePage-1"]', '[data-testid="droppablePage-1"]', { // Cleanup
      destinationOffsetX: 400,
      destinationOffsetY: 450,
    })
    .pressKey('backspace enter delete'); // Cleanup
});

/*
  Checkbox Field
*/
test('Drop a checkbox', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13914`)
    .expect(Selector('[data-testid="checkboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="checkboxTool"]', '[data-testid="droppablePage-0"]')
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]')
    .pressKey('backspace enter delete'); // Cleanup
});

test('Drop a checkbox off the page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13915`)
    .expect(Selector('[data-testid="checkboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="checkboxTool"]', '[data-testid="pageContainer"]', {
      destinationOffsetX: 1,
      destinationOffsetY: 1,
    })
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .notOk(); // Assert element does not exist(as expected)
});

// test('Drop a checkbox on the page edge', async (t) => { // Inconsistent breaks
//   await t
//     .dragToElement('[data-testid="checkboxTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetY: 2,
//     })
//     .expect(Selector('[data-testid^=fieldWrapper]').exists)
//     .ok({ timeout: longTimeout }) // Assert element exists
//     .click('[data-testid^=fieldWrapper]')
//     .pressKey('backspace enter delete'); // Cleanup // Assert element exists
// });

test('Drop a checkbox to other page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13916`)
    .expect(Selector('[data-testid="checkboxTool"]').exists)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="checkboxTool"]', '[data-testid="droppablePage-1"]', {
      destinationOffsetX: 400,
      destinationOffsetY: 450,
    })
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .dragToElement('[data-testid="droppablePage-1"]', '[data-testid="droppablePage-1"]', { // Cleanup
      destinationOffsetX: 400,
      destinationOffsetY: 450,
    })
    .pressKey('backspace enter delete'); // Cleanup // Assert element exists
});

/*
  Signature Field
*/
// TODO: reimplement
// test('Drop a signature', async (t) => {
//   await t
//     .expect(Selector('[data-testid="signatureTool"]').exists)
//     .ok({ timeout: longTimeout })
//     .dragToElement('[data-testid="signatureTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 150,
//       destinationOffsetY: 50,
//     })
//     .expect(Selector('[data-testid^=fieldWrapper]').exists)
//     .ok({ timeout: longTimeout }) // Assert element exists
//     .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]', { // Cleanup
//       destinationOffsetX: 150,
//       destinationOffsetY: 50,
//     })
//     .pressKey('backspace enter delete'); // Cleanup
// });

test('Drop a signature off the page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13917`)
    .expect(Selector('[data-testid="signatureTool"]').exists)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="signatureTool"]', '[data-testid="pageContainer"]', {
      destinationOffsetX: 1,
      destinationOffsetY: 1,
    })
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .notOk(); // Assert element does not exist(as expected)
});

// TODO: reimplement
// test('Drop a signature on the page edge', async (t) => {
//   await t
//     .dragToElement('[data-testid="signatureTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 2,
//       destinationOffsetY: 2,
//     })
//     .expect(Selector('[data-testid^=fieldWrapper]').exists)
//     .ok({ timeout: longTimeout }) // Assert element exists
//     .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]', { // Cleanup
//       destinationOffsetX: 2,
//       destinationOffsetY: 2,
//     })
//     .pressKey('backspace enter delete'); // Cleanup // Assert element exists
// });

test('Drop a signature to other page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13918`)
    .expect(Selector('[data-testid="signatureTool"]').exists)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="signatureTool"]', '[data-testid="droppablePage-1"]', {
      destinationOffsetX: 400,
      destinationOffsetY: 450,
    })
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .dragToElement('[data-testid="droppablePage-1"]', '[data-testid="droppablePage-1"]', { // Cleanup
      destinationOffsetX: 400,
      destinationOffsetY: 450,
    })
    .pressKey('backspace enter delete'); // Cleanup // Assert element exists
});

/*
  Initial Field
*/
// TODO: reimplement
// test('Drop an inital', async (t) => {
//   await t
//     .dragToElement('[data-testid="initialTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 150,
//       destinationOffsetY: 50,
//     })
//     .expect(Selector('[data-testid^=fieldWrapper]').exists)
//     .ok({ timeout: longTimeout }) // Assert element exists
//     .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]', { // Cleanup
//       destinationOffsetX: 150,
//       destinationOffsetY: 50,
//     })
//     .pressKey('backspace enter delete'); // Cleanup
// });

// TODO: reimplement
// test('Drop an initial off the page', async (t) => {
//   await t
//     .dragToElement('[data-testid="initialTool"]', '[data-testid="pageContainer"]', {
//       destinationOffsetX: 100,
//       destinationOffsetY: 50,
//     })
//     .expect(Selector('[data-testid^=fieldWrapper]').exists)
//     .notOk(); // Assert element does not exist(as expected)
// });

// TODO: reimplement
// test('Drop an initial on the page edge', async (t) => {
//   await t
//     .dragToElement('[data-testid="initialTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 2,
//       destinationOffsetY: 2,
//     })
//     .expect(Selector('[data-testid^=fieldWrapper]').exists)
//     .ok({ timeout: longTimeout }) // Assert element exists
//     .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]', { // Cleanup
//       destinationOffsetX: 2,
//       destinationOffsetY: 2,
//     })
//     .pressKey('backspace enter delete'); // Cleanup // Assert element exists
// });

test('Drop an initial to other page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13919`)
    .expect(Selector('[data-testid="initialTool"]').exists)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="initialTool"]', '[data-testid="droppablePage-1"]', {
      destinationOffsetX: 400,
      destinationOffsetY: 450,
    })
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .dragToElement('[data-testid="droppablePage-1"]', '[data-testid="droppablePage-1"]', { // Cleanup
      destinationOffsetX: 400,
      destinationOffsetY: 450,
    })
    .pressKey('backspace enter delete'); // Cleanup // Assert element exists
});

/*
  Line Field
*/
// TODO: reimplement
// test('Drop a line', async (t) => {
//   await t
//     .dragToElement('[data-testid="lineTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 150,
//       destinationOffsetY: 50,
//     })
//     .expect(Selector('[data-testid="line-field-container"]').exists)
//     .ok({ timeout: longTimeout }) // Assert element exists
//     .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]', { // Cleanup
//       destinationOffsetX: 150,
//       destinationOffsetY: 50,
//     })
//     .pressKey('backspace enter delete'); // Cleanup
// });

// TODO: reimplement
// test('Drop a line off the page', async (t) => {
//   await t
//     .dragToElement('[data-testid="lineTool"]', '[data-testid="pageContainer"]', {
//       destinationOffsetX: 10,
//       destinationOffsetY: 50,
//     })
//     .expect(Selector('[data-testid="line-field-container"]').visible)
//     .notOk(); // Assert element does not exist(as expected)
// });

// TODO: reimplement
// test('Drop a line on the page edge', async (t) => {
//   await t
//     .dragToElement('[data-testid="lineTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 2,
//       destinationOffsetY: 2,
//     })
//     .expect(Selector('[data-testid="line-field-container"]').exists)
//     .ok({ timeout: longTimeout }) // Assert element exists
//     .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]', { // Cleanup
//       destinationOffsetX: 2,
//       destinationOffsetY: 2,
//     })
//     .pressKey('backspace enter delete'); // Cleanup // Assert element exists
// });

test('Drop a line to other page', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=139110`)
    .expect(Selector('[data-testid="lineTool"]').exists)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="lineTool"]', '[data-testid="droppablePage-1"]', {
      destinationOffsetX: 400,
      destinationOffsetY: 450,
    })
    .expect(Selector('[data-testid="line-field-container"]').exists)
    .ok({ timeout: longTimeout }) // Assert element exists
    .dragToElement('[data-testid="droppablePage-1"]', '[data-testid="droppablePage-1"]', { // Cleanup
      destinationOffsetX: 400,
      destinationOffsetY: 450,
    })
    .pressKey('backspace enter delete'); // Cleanup // Assert element exists
});
