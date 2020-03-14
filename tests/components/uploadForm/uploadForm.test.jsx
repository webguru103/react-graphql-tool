/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import UploadForm from '../../../src/shared/uploadForm/uploadForm';
import { MAX_UPLOAD_SIZE } from '../../../src/control-panel/form-management/constants';

describe('UploadForm', () => {
  afterEach(cleanup);
  const Component = withContext(UploadForm);

  test('renders', () => {
    const { container } = render(<Component
      xhr={new XMLHttpRequest()}
      acceptTypes={['application/pdf']}
      acceptMultiple={false}
      maxUploadSize={MAX_UPLOAD_SIZE}
      uploadLabel={<FormattedMessage id="upload-label" defaultMessage="Upload PDF, JPG, PNG" />}
      onDrop={() => {}}
      setUploadError={() => {}}
      setURLs={() => {}}
      uploadEndpoint=""
    />);
    expect(container).toMatchSnapshot();
  });

  test('progress bar and cancel button should display when upload in progress', () => {
    const xhr = new XMLHttpRequest();
    const { getByTestId } = render(<Component
      xhr={xhr}
      acceptTypes={['application/pdf']}
      acceptMultiple={false}
      maxUploadSize={MAX_UPLOAD_SIZE}
      uploadLabel={<FormattedMessage id="upload-label" defaultMessage="Upload PDF, JPG, PNG" />}
      onDrop={() => {}}
      setUploadError={() => {}}
      setURLs={() => {}}
      uploadEndpoint=""
      testMode
    />);

    const progressEvent = new ProgressEvent('progress', {
      lengthComputable: true,
      loaded: 500,
      total: 1000,
    });
    fireEvent(xhr.upload, progressEvent);

    // Progress bar should be present
    getByTestId('linear-progress');
    getByTestId('cancel-button');
  });

  test('progress bar & cancel button should be hidden if progress is zero', () => {
    const xhr = new XMLHttpRequest();
    const { getByTestId } = render(<Component
      xhr={xhr}
      acceptTypes={['application/pdf']}
      acceptMultiple={false}
      maxUploadSize={MAX_UPLOAD_SIZE}
      uploadLabel={<FormattedMessage id="upload-label" defaultMessage="Upload PDF, JPG, PNG" />}
      onDrop={() => {}}
      setUploadError={() => {}}
      setURLs={() => {}}
      uploadEndpoint=""
      testMode
    />);

    // Should not throw error
    expect(() => getByTestId('linear-progress')).toThrow();
    expect(() => getByTestId('cancel-button')).toThrow();
  });

  test('should render a processing button once progress=100% and should reset network error on click', () => {
    const handleResetNetworkErrorOnCancel = jest.fn();

    const xhr = new XMLHttpRequest();
    const { getByTestId } = render(<Component
      xhr={xhr}
      acceptTypes={['application/pdf']}
      acceptMultiple={false}
      maxUploadSize={MAX_UPLOAD_SIZE}
      uploadLabel={<FormattedMessage id="upload-label" defaultMessage="Upload PDF, JPG, PNG" />}
      onDrop={() => {}}
      setUploadError={handleResetNetworkErrorOnCancel}
      setURLs={() => {}}
      uploadEndpoint=""
      testMode
    />);

    const progressEvent = new ProgressEvent('progress', {
      lengthComputable: true,
      loaded: 1000,
      total: 1000,
    });
    fireEvent(xhr.upload, progressEvent);

    const processingButton = getByTestId('processing');

    fireEvent(
      processingButton,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );

    expect(handleResetNetworkErrorOnCancel).toHaveBeenCalledTimes(1);

  });
});
