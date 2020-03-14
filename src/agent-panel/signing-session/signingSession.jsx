import * as React from 'react';
import EditorContainer from './editorContainer';
import { EDITOR_MODE } from '../../constants';

const SigningSession = () => <EditorContainer mode={EDITOR_MODE.SIGNING} />;

export default SigningSession;
