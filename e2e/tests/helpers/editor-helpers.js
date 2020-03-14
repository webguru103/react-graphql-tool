import { t, Selector } from 'testcafe';

export default class EditorHelpers {

  constructor() {
    this.pages = [Selector('[data-testid="droppablePage-0"]'), Selector('[data-testid="droppablePage-1"]')];
    this.textboxTool = Selector('[data-testid="textboxTool"');
    this.fields = Selector('[data-testid="fieldWrapper"]');
    this.confirmFieldsDeleteButton = Selector('[data-testid="confirm-fields-delete"]');
    this.cloneButton = Selector('[data-testid="cloneField"]');
    this.fieldsByPage = [
      Selector('[data-testid="droppablePage-0"] [data-testid^="fieldWrapper"]'),
      Selector('[data-testid="droppablePage-1"] [data-testid^="fieldWrapper"]'),
    ];
    this.pageContainer = Selector('[data-testid="pageContainer"]');
  }

  // TODO extend me
  async createTextbox(pageIndex, x, y) {
    await t
      .dragToElement(this.textboxTool, this.pages[pageIndex], {
        destinationOffsetX: x,
        destinationOffsetY: y,
      });
  }

  async multiSelect(pageIndex, { startX, startY } = {}) {
    const pageRect = await this.pages[pageIndex].boundingClientRect;
    // select all fields
    await t
      .dragToElement(this.pages[pageIndex], this.pages[pageIndex], {
        offsetX: 1 || startX,
        offsetY: 1 || startY,
        destinationOffsetX: pageRect.width - 2,
        destinationOffsetY: 500,
      });
  }

}
