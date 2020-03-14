/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import { withContext } from '../../../test-helpers/contextWrapper';
import { LineFieldC } from '../../../../src/editor/core/lineField/lineField';
import { noop } from '../../../../src/utility';

describe('LineField', () => {
  afterEach(cleanup);
  const Component = withContext(LineFieldC);

  test('renders a div with 90 degree rotation', () => {

    const field = {
      id: 53151,
      fieldName: 'LineField',
      x1: 10,
      y1: 10,
      x2: 10,
      y2: 30,
      strokeThickness: 5,
    };

    const pageRects = {
      0: {
        width: 900,
        height: 1200,
      },
    };

    const { container, getByTestId } = render(<Component
      classes={{}}
      connectDragSource={x => x}
      connectDragPreview={x => x}
      isDragging={false}
      connectDragPreviewResize1={x => x}
      connectDragSourceResize1={x => x}
      isDraggingResize1={false}
      connectDragPreviewResize2={x => x}
      connectDragSourceResize2={x => x}
      isDraggingResize2={false}
      dragging={false}
      resizing={false}
      offsetHeight={null}
      offsetWidth={null}
      field={field}
      key={field.id}
      pageRects={pageRects}
      pageNumber={0}
      handleActivePageField={noop}
      handleLineFieldUpdate={noop}
      zoom={1}
      handleActiveSelectionClear={noop}
      addFieldToSelection={noop}
      handleActiveSelectionRemove={noop}
      currentActivePageField={false}
      inActiveSelection={false}
      outsideClickIgnoreClass="fieldOutClick"
    />);

    expect(container).toMatchSnapshot();
    const lineField = getByTestId('line-field-container');
    expect(lineField.style._values.transform).toBe('translate(0px, 20px) rotate(90deg)');
  });

  test('renders a div with 51.11... degree rotation', () => {

    const field = {
      id: 52152,
      fieldName: 'LineField',
      x1: 42,
      y1: 52,
      x2: 263,
      y2: 326,
      strokeThickness: 5,
    };

    const pageRects = {
      0: {
        width: 900,
        height: 1200,
      },
    };

    const { getByTestId } = render(<Component
      classes={{}}
      connectDragSource={x => x}
      connectDragPreview={x => x}
      isDragging={false}
      connectDragPreviewResize1={x => x}
      connectDragSourceResize1={x => x}
      isDraggingResize1={false}
      connectDragPreviewResize2={x => x}
      connectDragSourceResize2={x => x}
      isDraggingResize2={false}
      dragging={false}
      resizing={false}
      offsetHeight={null}
      offsetWidth={null}
      field={field}
      key={field.id}
      pageRects={pageRects}
      pageNumber={0}
      handleActivePageField={noop}
      handleLineFieldUpdate={noop}
      zoom={1}
      handleActiveSelectionClear={noop}
      addFieldToSelection={noop}
      handleActiveSelectionRemove={noop}
      currentActivePageField={false}
      inActiveSelection={false}
      outsideClickIgnoreClass="fieldOutClick"
    />);

    const lineField = getByTestId('line-field-container');
    expect(lineField.style._values.transform).toBe('translate(-23.509232712377894px, 189px) rotate(51.11141655726794deg)');
  });

  test('renders a div with 45 degree rotation', () => {

    const field = {
      id: 53151,
      fieldName: 'LineField',
      x1: 10,
      y1: 10,
      x2: 30,
      y2: 30,
      strokeThickness: 5,
    };

    const pageRects = {
      0: {
        width: 900,
        height: 1200,
      },
    };

    const { getByTestId } = render(<Component
      classes={{}}
      connectDragSource={x => x}
      connectDragPreview={x => x}
      isDragging={false}
      connectDragPreviewResize1={x => x}
      connectDragSourceResize1={x => x}
      isDraggingResize1={false}
      connectDragPreviewResize2={x => x}
      connectDragSourceResize2={x => x}
      isDraggingResize2={false}
      dragging={false}
      resizing={false}
      offsetHeight={null}
      offsetWidth={null}
      field={field}
      key={field.id}
      pageRects={pageRects}
      pageNumber={0}
      handleActivePageField={noop}
      handleLineFieldUpdate={noop}
      zoom={1}
      handleActiveSelectionClear={noop}
      addFieldToSelection={noop}
      handleActiveSelectionRemove={noop}
      currentActivePageField={false}
      inActiveSelection={false}
      outsideClickIgnoreClass="fieldOutClick"
    />);

    const lineField = getByTestId('line-field-container');
    expect(lineField.style._values.transform).toBe('translate(5.857864376269049px, 20px) rotate(44.99999999999999deg)');
  });
});
