import React from 'react';
import { FormattedMessage } from 'react-intl';

export const MAX_UPLOAD_SIZE = 25 * 1024 * 1024;
export const MAX_UPLOAD_DOCUMENTS_COUNT = 100;
export const MAX_SIGNEES_COUNT = 20;
export const PDF = 'application/pdf';
export default {
  UPLOAD_LABEL: <FormattedMessage id="upload-label" defaultMessage="Upload PDF" />,
  DRAG_FILE_DETAILS: <FormattedMessage id="drag-file-details" defaultMessage="Drag & drop, or click this area to upload." />,
  NO_FORM_BASE_UPLOADED: <FormattedMessage id="no-pdf-uploaded" defaultMessage="Please upload the form base" />,
};

export const KEY_CODE = {
  ENTER: 13,
  BACKSPACE: 8,
  SPACE: 32,
  ESC: 27,
};

export const EVENT_KEYS = {
  ENTER: 'Enter',
  BACKSPACE: 'Backspace',
  SPACE: 'Space',
  ESC: 'Escape',
};

export const IDENTITY = {
  AGENT: 'agent',
  ADMIN: 'admin',
  CP_USER: 'cp-user',
};

export const SYSTEM_ID = {
  CONTROL_PANEL: 1,
  ADMIN_PANEL: 2,
  AGENT_PANEL: 3,
};

export const ROLE_ID = {
  CP_SEED_ADMIN: 1,
  CP_SUPER_ADMIN: 2,
  CP_ADMIN: 3,
  SUPER_ADMIN: 4,
  ADMIN: 5,
  AGENT: 6,
};

export const ROLE_CATEGORY = {
  CP_SEED_ADMIN: 'CP_SEED_ADMIN',
  CP_SUPER_ADMIN: 'CP_SUPER_ADMIN',
  CP_ADMIN: 'CP_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  AGENT: 'AGENT',
};

export const RESOURCE_CATEGORY = {
  SYSTEM: 'SYSTEM',
  BROKERAGE: 'BROKERAGE',
  TRANSACTION: 'TRANSACTION',
  DOCUMENT: 'DOCUMENT',
};

export const STATUS = {
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  PENDING: 'PENDING',
};

export const INVITATION_ACTION = {
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
};

export const DEFAULT_PAGE_SIZE = 10;

export const ENVIRONMENTS = {
  DEV: 'DEV',
  SIT: 'SIT',
  QA: 'QA',
  PROD: 'PROD',
};

export const FORM_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const EDITOR_MODE = {
  TEMPLATE_DRAFT: 'template-draft',
  TEMPLATE_PUBLISHED: 'template-published',
  INSTANCE_PREPARATION: 'instance-preparation',
  INSTANCE_VIEW: 'instance-view',
  SIGNING: 'signing',
  SIGNING_VIEW: 'signing-view',
};
