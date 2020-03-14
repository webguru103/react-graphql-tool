/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { withContext } from '../../../test-helpers/contextWrapper';
import { LineAttributesC } from '../../../../src/editor/core/attributes/lineAttributes';

describe('LineField', () => {

  jest.useFakeTimers();

  afterEach(cleanup);
  const Component = withContext(LineAttributesC);

  test('renders', () => {

    const field = {
      id: 53151,
      fieldName: 'LineField',
      x1: 10,
      y1: 10,
      x2: 10,
      y2: 30,
      strokeThickness: 5,
    };

    const pageRef = {
      getBoundingFieldRect: () => {},
    };

    const handleLineFieldUpdate = jest.fn();
    const activePageFieldPageNumber = 0;

    const { container } = render(<Component
      classes={{}}
      field={field}
      handleLineFieldUpdate={handleLineFieldUpdate}
      activePageFieldPageNumber={activePageFieldPageNumber}
      pageRef={pageRef}
    />);

    expect(container).toMatchSnapshot();
  });

  test('calls handleLineFieldUpdate with correct input', () => {

    const field = {
      id: 53151,
      fieldName: 'LineField',
      x1: 10,
      y1: 10,
      x2: 10,
      y2: 30,
      strokeThickness: 5,
      pageNumber: 0,
      positionLock: false,
    };

    const pageRef = {
      getBoundingClientRect: () => ({
        height: 500,
        width: 600,
      }),
    };

    const newX1Input = '500';

    const handleLineFieldUpdate = jest.fn();
    const activePage = 0;

    const { getByTestId } = render(<Component
      classes={{}}
      field={field}
      handleLineFieldUpdate={handleLineFieldUpdate}
      pageIndex={activePage}
      pageRef={pageRef}
    />);

    const x1Input = getByTestId('line-attribute-x1-input');
    fireEvent.change(x1Input, { target: { value: newX1Input } });

    const x2Input = getByTestId('line-attribute-x2-input');
    fireEvent.click(x2Input);

    // Fast forward all timers so Loading indicator content is rendered
    jest.runAllTimers();

    const expected = {
      fieldName: 'LineField',
      id: 53151,
      positionLock: false,
      strokeThickness: 5,
      x1: Number(newX1Input),
      x2: 10,
      y1: 10,
      y2: 30,
      pageNumber: 0,
    };

    expect(handleLineFieldUpdate.mock.calls.length).toBe(1);
    expect(handleLineFieldUpdate).lastCalledWith(
      field.id,
      expected,
      activePage,
    );
  });

  test('calls handleLineFieldUpdate with correct input after adjusting to page size', () => {

    const field = {
      id: 53151,
      fieldName: 'LineField',
      x1: 10,
      y1: 10,
      x2: 10,
      y2: 30,
      strokeThickness: 5,
      pageNumber: 0,
      positionLock: false,
    };

    const pageRef = {
      getBoundingClientRect: () => ({
        height: 500,
        width: 600,
      }),
    };

    const newX1Input = '800';
    const expectedWidthMax = '600';

    const handleLineFieldUpdate = jest.fn();
    const activePage = 0;

    const { getByTestId } = render(<Component
      classes={{}}
      field={field}
      handleLineFieldUpdate={handleLineFieldUpdate}
      pageIndex={activePage}
      pageRef={pageRef}
      zoom={1}
    />);

    const x1Input = getByTestId('line-attribute-x1-input');
    fireEvent.change(x1Input, { target: { value: newX1Input } });
    fireEvent.blur(x1Input);

    // Fast forward all timers so Loading indicator content is rendered
    jest.runAllTimers();

    const expected = {
      fieldName: 'LineField',
      id: 53151,
      positionLock: false,
      strokeThickness: 5,
      x1: Number(expectedWidthMax),
      x2: field.x2,
      y1: field.y1,
      y2: field.y2,
      pageNumber: 0,
    };

    expect(handleLineFieldUpdate.mock.calls.length).toBe(1);
    expect(handleLineFieldUpdate).lastCalledWith(
      field.id,
      expected,
      activePage,
    );
  });

});
