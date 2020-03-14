import React from 'react';
import { FormattedMessage } from 'react-intl';

export const EDITOR_MODE = {
  TEMPLATE_DRAFT: 'template-draft',
  TEMPLATE_PUBLISHED: 'template-published',
  INSTANCE_PREPARATION: 'instance-preparation',
  INSTANCE_VIEW: 'instance-view',
  SIGNING: 'signing',
};

export const DIRECTIONS = {
  DOWN: 'DOWN',
  UP: 'UP',
};

export const FIELD_TYPES = {
  TEXT: 1,
  BOOL: 2,
  SIGNATURE: 3,
  INITIAL: 4,
  LINE: 5,
  DATE: 6,
};

const ItemTypes = {
  CHECKBOX: 'checkbox',
  TEXT: 'text',
  DATE: 'date',
  FIELD: 'field',
  SIGNATURE: 'signature',
  INITIAL: 'initial',
  LINE: 'line',
  RESIZE: 'resize',
  RESIZE_LINE: 'resize-line',
  SELECTION_BOX: 'selection-box',
};

export const DUPLICATION_OFFSET = 5;

// first number is width
export const SIGNATURE_RATIO = 4 / 1;
export const INITIAL_RATIO = 4 / 3;
export const CHECKBOX_RATIO = 1 / 1;

export const CHECKBOX_MIN_WIDTH = 16;
export const CHECKBOX_MIN_HEIGHT = 16;
export const CHECKBOX_MAX_WIDTH = 64;
export const CHECKBOX_MAX_HEIGHT = 64;
export const TEXTBOX_MIN_WIDTH = 16;
export const TEXTBOX_MAX_WIDTH = 900; // TODO no reqs for now
export const TEXTBOX_MIN_HEIGHT = 16;
export const TEXTBOX_MAX_HEIGHT = 1200; // TODO no reqs for now
export const SIGNATURE_MIN_WIDTH = 144;
export const SIGNATURE_MIN_HEIGHT = SIGNATURE_MIN_WIDTH / SIGNATURE_RATIO;
export const SIGNATURE_MAX_WIDTH = 480;
export const SIGNATURE_MAX_HEIGHT = SIGNATURE_MAX_WIDTH / SIGNATURE_RATIO;
export const INITIAL_MIN_WIDTH = 48;
export const INITIAL_MIN_HEIGHT = INITIAL_MIN_WIDTH / INITIAL_RATIO;
export const INITIAL_MAX_WIDTH = 48 * 2.5;
export const INITIAL_MAX_HEIGHT = INITIAL_MAX_WIDTH / INITIAL_RATIO;
export const LINE_MIN_STROKE_THICKNESS = 1;
export const LINE_MAX_STROKE_THICKNESS = 10;

export const DEFAULT_TEXTBOX_HEIGHT = 24;
export const DEFAULT_TEXTBOX_WIDTH = 128;
export const DEFAULT_DATE_HEIGHT = 24;
export const DEFAULT_DATE_WIDTH = 90;
export const DEFAULT_PEOPLE_HEIGHT = 30;
export const DEFAULT_PEOPLE_WIDTH = 150;
export const DEFAULT_CHECKBOX_HEIGHT = 28;
export const DEFAULT_CHECKBOX_WIDTH = 28;
export const DEFAULT_SIGNATURE_WIDTH = 192;
export const DEFAULT_SIGNATURE_HEIGHT = 48;
export const DEFAULT_INITIAL_HEIGHT = 42;
export const DEFAULT_INITIAL_WIDTH = 56;
export const DEFAULT_LINE_LENGTH = 100;
export const DEFAULT_LINE_STROKE = 3;
export const DEFAULT_FONT_SIZE = 15;

export const ZOOM_MAXIMUM = 200;
export const ZOOM_MINIMUM = 50;
export const ZOOM_PRECISION_FACTOR = 100;
export const ZOOM_DECREASE_DEFAULT = -25;
export const ZOOM_INCREASE_DEFAULT = 25;
export const DEFAULT_ZOOM = 100;
export const DEFAULT_PAGE_WIDTH = 850;
export const DEFAULT_PAGE_HEIGHT = 1100;
export const PAGE_LIST_MIN_WIDTH = 320;
export const PAGE_SIDE_MARGIN = 30;

export const STAMP_SIGNING_SCROLL_DELAY = 1000;

export const DEFAULT_DOCUMENT_NAME = 'Document';

export const STAMP_URL_PLACEHOLDER = 'dealtap.ca/xxx-xxx';
export const DEFAULT_STAMP_URL_FONT_SIZE = 9;

export default {
  ItemTypes,
  CANCEL: <FormattedMessage id="cancel" defaultMessage="Cancel" />,
  CONFIRM: <FormattedMessage id="confirm" defaultMessage="Confirm" />,
  DISCARD: <FormattedMessage id="discard" defaultMessage="Discard" />,
  DISCARD_DRAFT: <FormattedMessage id="discard-draft" defaultMessage="Discard Draft" />,
  REVERT_TO_PUBLISHED: <FormattedMessage id="revert-published" defaultMessage="Revert to Published Version" />,
  PUBLISH: <FormattedMessage id="publish" defaultMessage="Publish" />,
  CONFIRM_DISCARD: <FormattedMessage id="confirm-discard" defaultMessage="Discard current draft?" />,
  CONFIRM_DISCARD_MESSAGE:
  <FormattedMessage
    id="confirm-discard-message"
    defaultMessage="The changes you made will be lost, and the current draft will be reverted to the existing published version."
  />,
  CONFIRM_PUBLISH: <FormattedMessage id="confirm-publish" defaultMessage="Confirm Publish?" />,
  CONFIRM_PUBLISH_MESSAGE: <FormattedMessage id="confirm-publish-message" defaultMessage="The existing published version will be overridden" />,
  DRAFT_DISCARDED_SUCCESSFULLY: (formName: string) => (
    <FormattedMessage id="draft-discarded-successfully" defaultMessage="Draft Discarded - {formName}" values={{ formName }} />
  ),
  DRAFT_PUBLISHED_SUCCESSFULLY: <FormattedMessage id="draft-successfully-published" defaultMessage="The draft has been successfully published" />,
  REQUEST_ERROR: <FormattedMessage id="request-error" defaultMessage="Sorry, there was an error processing your request!" />,
  DELETE_FIELDS: <FormattedMessage id="delete-fields" defaultMessage="Delete Fields" />,
  CANNOT_ADD_FIELD: <FormattedMessage id="cannot-add-field" defaultMessage="Can not add field, some error occurred" />,
  CANNOT_UPDATE_FIELD: <FormattedMessage id="cannot-update-field" defaultMessage="Can not update fields, some error occurred" />,
  CANNOT_DELETE_FIELD: <FormattedMessage id="cannot-delete-field" defaultMessage="Can not delete fields, some error occurred" />,
  CANNOT_COMPLETE_SIGNING: <FormattedMessage id="cannot-complete-signing" defaultMessage="Cannot complete signing, some error occurred" />,
  CANNOT_SIGN_FIELD: <FormattedMessage id="cannot-sign-field" defaultMessage="Cannot sign field, some error occurred" />,
  PLEASE_SIGN_ALL_FIELDS: <FormattedMessage id="please-sign-all-fields" defaultMessage="Please sign your fields first" />,
  CANNOT_WIPE_FIELD: <FormattedMessage id="cannot-wipe-field" defaultMessage="Cannot wipe a field, some error occurred" />,
  CLICK_TO_SIGN: <FormattedMessage id="click-to-sign" defaultMessage="Click to sign" />,
  CLICK_TO_INITIAL: <FormattedMessage id="click-to-initial" defaultMessage="Click to initial" />,
  DOWNLOAD_ERROR: <FormattedMessage id="download-error" defaultMessage="Failed to download document(s)" />,
  NO_MORE_FIELDS: <FormattedMessage id="no-more-fields" defaultMessage="Can not add any more fields" />,
};
