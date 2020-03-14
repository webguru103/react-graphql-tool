import React from 'react';

import EditorContainer from '../control-panel/editor-container/editorContainer';
import { EDITOR_MODE } from './constants';

export default {
  TemplateDraftMode: () => <EditorContainer mode={EDITOR_MODE.TEMPLATE_DRAFT} />,
  TemplateViewMode: () => <EditorContainer mode={EDITOR_MODE.TEMPLATE_PUBLISHED} />,
  InstanceViewMode: () => <EditorContainer mode={EDITOR_MODE.INSTANCE_VIEW} />,
  InstancePrepareMode: () => <EditorContainer mode={EDITOR_MODE.INSTANCE_PREPARATION} />,
  SignMode: () => <EditorContainer mode={EDITOR_MODE.SIGNING} />,
};

export { default as EditorCore } from './core/editorCore';
