/* global fixture:true */
import { Selector } from 'testcafe';
import { cpUser } from '../helpers/users';
import { baseUrl, longTimeout } from '../helpers/constants';

fixture('Copy, Paste & Duplicate')
  .page(`${baseUrl}/login`)
  .beforeEach(async (t) => {
    await t.maximizeWindow()
      .useRole(cpUser);
  });

test('copy and paste w/keyboard', async (t) => {
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13951`)
    .expect(Selector('[data-testid^=fieldWrapper]').count)
    .eql(1, { timeout: longTimeout })
  await t
    .wait(1000)
    .drag('[data-testid="droppablePage-0"]', 500, 500, {
      offsetX: 5,
      offsetY: 5,
    })
    .pressKey('ctrl+c')
    .pressKey('ctrl+c')
    .pressKey('ctrl+v')
    .expect(Selector('[data-testid^=fieldWrapper]').count)
    .eql(2)
    .pressKey('delete');
});

// test('can copy and paste multiple fields', async (t) => {
//   await t
//     .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13952`)
//     .expect(Selector('[data-testid^=fieldWrapper]').count).eql(1);
//   await editor.multiSelect(0);
//   await t.hover(editor.pages[0], { offsetX: 100, offsetY: 100 });
//   await t
//     .pressKey('ctrl+c')
//     .pressKey('ctrl+v');
//   // page have 2 fields here
//   await t
//     .expect(Selector('[data-testid^=fieldWrapper]').count).eql(2);

//   await editor.multiSelect(0);
//   await t.hover(editor.pages[0], { offsetX: 200, offsetY: 200 });
//   await t
//     // weirdly doesn't work with one ctrl+c
//     .pressKey('ctrl+c')
//     .pressKey('ctrl+c')
//     .pressKey('ctrl+v');
//   // page have 4 fields here
//   await t
//     .expect(Selector('[data-testid^=fieldWrapper]').count).eql(4);

//   // cleanup
//   await editor.multiSelect(0);
//   await t
//     .pressKey('delete')
//     .pressKey('delete');
//   await t
//     .click(editor.confirmFieldsDeleteButton);
//   await editor.createTextbox(0, 200, 200);
// });

// test('can copy field from one page to another', async (t) => {
//   await t
//     .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13953`)
//     .expect(Selector('[data-testid^=fieldWrapper]').count).eql(1);
//   await editor.multiSelect(0);
//   await t
//     .pressKey('ctrl+c');
//   await t.hover(editor.pages[1], { offsetX: 100, offsetY: 100 });
//   await t
//     .pressKey('ctrl+v');
//   // now page 2 should have 1 field on it
//   await t
//     .expect(editor.fieldsByPage[1].count).eql(1);

//   // cleanup
//   await t
//     .pressKey('delete');
// });

// test
//   .requestHooks(logger)('field stuck to the edge of the page, if doesn\'t fit the page', async (t) => {
//     await t
//       .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13954`);
//     await editor.multiSelect(0);
//     await t
//       .pressKey('ctrl+c');
//     const pageRect = await editor.pages[0].boundingClientRect;
//     await t.hover(editor.pages[0], { offsetX: pageRect.width - 1, offsetY: 100 });
//     await t
//       .pressKey('ctrl+v');
//     const newFieldId = JSON.parse(logger.requests[logger.requests.length - 1].response.body).data.fields.textFields[0].id;
//     const newFieldRect = await Selector(`[data-testid="fieldWrapper-${newFieldId}"]`).boundingClientRect;
//     await t
//       .expect(newFieldRect.left).eql(pageRect.right - newFieldRect.width);

//     // cleanup
//     await t
//       .pressKey('delete');
//   });

// test
//   .requestHooks(logger)('can duplicate fields with ctrl+d', async (t) => {
//     await t
//       .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13955`);
//     await editor.multiSelect(0);
//     const originalFieldRect = await Selector('[data-testid^=fieldWrapper]').boundingClientRect;
//     await t
//       .pressKey('ctrl+d');
//     const newFieldId = JSON.parse(logger.requests[logger.requests.length - 1].response.body).data.fields.textFields[0].id;
//     const newFieldRect = await Selector(`[data-testid="fieldWrapper-${newFieldId}"]`).boundingClientRect;
//     await t
//       .expect(newFieldRect.left).eql(originalFieldRect.left + 5)
//       .expect(newFieldRect.top).eql(originalFieldRect.top + 5);

//     // cleanup
//     await t
//       .pressKey('delete');
//   });

// test
//   .requestHooks(logger)('field duplicated near the border will be bounced by 5px', async (t) => {
//     await t
//       .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13956`)
//     const pageRect = await editor.pages[0].boundingClientRect;

//     await editor.multiSelect(0);
//     // add new field near the border
//     await t.hover(editor.pages[0], { offsetX: pageRect.width - 1, offsetY: 100 });
//     await t
//       .pressKey('ctrl+c')
//       .pressKey('ctrl+v');

//     const firstCopyFieldId = JSON.parse(logger.requests[logger.requests.length - 1].response.body).data.fields.textFields[0].id;

//     const firstCopyFieldRect = await Selector(`[data-testid="fieldWrapper-${firstCopyFieldId}"]`).boundingClientRect;

//     // duplicate new field
//     await t
//       .pressKey('ctrl+d');
//     const secondCopyFieldId = JSON.parse(logger.requests[logger.requests.length - 1].response.body).data.fields.textFields[0].id;

//     const secondCopyFieldRect = await Selector(`[data-testid="fieldWrapper-${secondCopyFieldId}"]`).boundingClientRect;
//     await t
//       .expect(secondCopyFieldRect.left).eql(firstCopyFieldRect.left)
//       .expect(secondCopyFieldRect.top).eql(firstCopyFieldRect.top + 5);

//     // cleanup
//     await editor.multiSelect(0);
//     await t
//       .pressKey('delete')
//       // delete is not triggered the first time
//       .pressKey('delete');
//     await t
//       .click(editor.confirmFieldsDeleteButton);
//     await editor.createTextbox(0, 200, 200);
//   });

// test('can duplicate the fields by pressing attribute panel button', async (t) => {
//   await t
//     .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=13957`)
//     .expect(editor.fieldsByPage[0].count).eql(1);
//   await editor.multiSelect(0);
//   await t
//     .click(editor.cloneButton);
//   // should have 2 fields now
//   await t
//     .expect(editor.fieldsByPage[0].count).eql(2);

//   // cleanup
//   await t
//     .pressKey('delete')
//     .pressKey('delete');
// });
