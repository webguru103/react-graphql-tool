/* global fixture:true */
import { Selector } from 'testcafe';
import { cpUser } from '../helpers/users';

import { baseUrl, longTimeout } from '../helpers/constants';

fixture('MultiSelect')
  .page(`${baseUrl}/login`)
  .beforeEach(async (t) => {
    await t
      .maximizeWindow()
      .useRole(cpUser);
  });

test('Multi Select and move', async (t) => {
  // Create Fields
  let originX;
  let movedX;
  await t
    .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=78901`)
    .dragToElement('[data-testid="checkboxTool"]', '[data-testid="droppablePage-0"]', {
      destinationOffsetX: 150,
    })
    .dragToElement('[data-testid="textboxTool"]', '[data-testid="droppablePage-0"]', {
      destinationOffsetX: 175,
    });
  await (Selector('[data-testid^=fieldWrapper]').getStyleProperty('left')).then((value) => {
    originX = value;
  });
  // Multi Select
  await t
    .wait(1000)
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout })
    .expect(Selector('[data-testid^=fieldWrapper]').visible)
    .ok({ timeout: longTimeout })
    .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]', {
      destinationOffsetX: 500,
    })
    .wait(longTimeout)
    // Move Fields
    .dragToElement('[data-testid^=fieldWrapper]', '[data-testid="droppablePage-0"]', {
      destinationOffsetX: 500,
    })
    .wait(longTimeout);
  await (Selector('[data-testid^=fieldWrapper]').getStyleProperty('left')).then((value) => {
    movedX = value;
  });
  await t
    .expect(Selector('[data-testid^=fieldWrapper]').exists)
    .ok({ timeout: longTimeout })
    .expect(Selector('[data-testid^=fieldWrapper]').visible)
    .ok({ timeout: longTimeout })
    .expect(movedX)
    .notEql(originX); // Editor should allow movement
});

// test('Multi Select and move off page', async (t) => {
//   let originX;
//   let movedX;
//   await t
//     .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=78903`)
//     .dragToElement('[data-testid="checkboxTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 350,
//       destinationOffsetY: 350,
//     })
//     .dragToElement('[data-testid="textboxTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 300,
//       destinationOffsetY: 300,
//     });
//   await (Selector('[data-testid^=fieldWrapper]').getStyleProperty('left')).then((value) => {
//     originX = value;
//   });
//   // Multi Select
//   await t
//     .wait(1000)
//     .expect(Selector('[data-testid^=fieldWrapper]').exists)
//     .ok({ timeout: longTimeout })
//     .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 50,
//       destinationOffsetY: 50,
//     })
//     // Move Fields
//     .dragToElement('[data-testid^=fieldWrapper]', '[data-testid="pageContainer"]', {
//       destinationOffsetX: 100,
//     });
//   await (Selector('[data-testid^=fieldWrapper]').getStyleProperty('left')).then((value) => {
//     movedX = value;
//   });
//   await t
//     .expect(Selector('[data-testid^=fieldWrapper]').exists)
//     .ok({ timeout: longTimeout })
//     .expect(movedX)
//     .eql(originX); // Editor should prevent movement
// });

// TODO: Reimplement test when DT4-1496 is solved
// test('Multi Select and delete', async (t) => {
//   // Multi Select
//   await t
//     .navigateTo(`${baseUrl}/cp-user/editor/edit?formId=78905`)
//     .dragToElement('[data-testid="checkboxTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 300,
//       destinationOffsetY: 300,
//     })
//     .dragToElement('[data-testid="textboxTool"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 375,
//       destinationOffsetY: 350,
//     })
//     .wait(1000)
//     .expect(Selector('[data-testid^=fieldWrapper]').exists)
//     .ok({ timeout: longTimeout })
//     .dragToElement('[data-testid="droppablePage-0"]', '[data-testid="droppablePage-0"]', {
//       destinationOffsetX: 50,
//       destinationOffsetY: 50,
//     });
//   // Delete
//   await t
//     .wait(1000)
//     .pressKey('backspace enter delete enter')
//     .expect(Selector('[data-testid^=fieldWrapper]').exists)
//     .notOk();
// });

// test('Multi Select and move between pages', async (t) => {
// // Multi Select
// .dragToElement('[data-testid="droppablePage-1"]', '[data-testid="droppablePage-1"]', {
//   destinationOffsetX: 50,
//   destinationOffsetY: 900,
// })
// Move Fields
// await scroll('[data-testid="droppablePage-1"]', { top: 800 })
// await scroll('[data-testid="droppablePage-1"]');
// await t.wait(5000);

// await t.dragToElement('[data-testid^=fieldWrapper]', '[data-testid="droppablePage-0"]', {
//   destinationOffsetX: 100,
//   destinationOffsetY: 100,
// })
// });
