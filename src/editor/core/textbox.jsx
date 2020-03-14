// @flow

import * as React from 'react';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';
import styles from './textbox.styles';
import { FIELD_TYPES, DEFAULT_FONT_SIZE } from '../constants';
import { EDITOR_MODE } from '../../constants';
import { compose } from '../../utility';
import type { AdaptedTextField } from './flowTypes';

const DEFAULT_LINE_HEIGHT = 14;

type PropType = {
  value: string,
  handleBlur: Function,
  classes: Object,
  theme: Object,
  handleChange: Function,
  withRef: Function,
  pageRef: React.Element,
  pageIndex: number,
  handleFieldResize: (id: number, width: number, height: number, pageIndex: number) => void,
  zoom: number,
  handleSelectedFieldsDuplicate: Function,
  dragging: boolean,
  disabled: boolean,
  docId: number,
  mode: $Keys<typeof EDITOR_MODE>,
  onFocus: ?(SyntheticEvent<HTMLInputElement>) => void,
  field: AdaptedTextField,
  setFocus?: Function,
};

type StateType = {
  isEditing: boolean
}

export class TextboxC extends React.PureComponent<PropType, StateType> {

  state = {
    isEditing: false,
  }

  // Debounce so that breaks are only evaluated in a batch after requests stop (trailing edge).
  evaluateBreaks = debounce((value) => {
    const { field } = this.props;
    if (field.width && field.dataReference) {
      this.updateTextLines(value, field.dataReference, field.width);
    }
    this.updating = false;
  }, 50, { leading: false, trailing: true })

  // Updating prevents extra calls to evaluateBreaks when component is already updating.
  updating = false

  componentDidUpdate(prevProps: PropType) {
    if (prevProps.field && this.props.field && prevProps.field.width !== this.props.field.width) {
      const { value } = this.props;
      const newValue = Array.isArray(value) ? value.join(' ') : value;
      this.evaluateBreaks(newValue);
    }
  }

  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const {
      pageIndex, handleFieldResize, handleChange, docId, mode, field,
    } = this.props;
    const {
      value,
      selectionStart,
      name,
      type,
    } = e.currentTarget;

    if (!handleChange) {
      return;
    }

    // Get scroll overflow amount of current change.
    // Can be more than one line if pasting text.
    const overflow = this.overflowAmount();

    // If current change will overflow textbox and change is not a deletion, possibly need to alter
    // textbox height.
    if (overflow > 0 && !this.isDeleting(value)) {
      const lineHeight = field.lineHeight || DEFAULT_LINE_HEIGHT;
      const additionalLines = Math.ceil(overflow / lineHeight);

      // Do not change textbox height if no room or field is locked.
      if ((mode !== EDITOR_MODE.INSTANCE_PREPARATION && mode !== EDITOR_MODE.TEMPLATE_DRAFT)
        || !this.pageHasRoomForNewLines(lineHeight * additionalLines)
        || field.positionLock
      ) {
        this.forceUpdate(() => {
          const previousCursorPosition = selectionStart - this.getCursorPositionDifference(value);
          this.textboxRef.setSelectionRange(previousCursorPosition, previousCursorPosition);
        });
        return;
      }

      // Update field by appropriate number of lines by default line height.
      if (field.width && field.height) {
        handleFieldResize(field.id, field.width, field.height + (lineHeight * additionalLines), pageIndex);
      }
    }

    handleChange(value, docId, name, type);
  };

  handleKeys = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    // Detect ctrl + d or cmd + d to be handled by this component.
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      const { pageIndex, handleSelectedFieldsDuplicate } = this.props;
      handleSelectedFieldsDuplicate(pageIndex);
      e.preventDefault();
    } else {
      e.stopPropagation();
    }
  }

  overflowAmount = () => this.textboxRef.scrollHeight - this.textboxRef.clientHeight;

  isDeleting = (value: string) => value.length < this.props.value.length;

  pageHasRoomForNewLines = (linesHeight: number) => {
    const { pageRef } = this.props;
    const pageRect = pageRef.getBoundingClientRect();
    const fieldRect = this.textboxRef.getBoundingClientRect();
    return fieldRect.top + fieldRect.height + linesHeight < pageRect.top + pageRect.height;
  };

  textAreaRef = (ref: ?HTMLElement) => {
    if (ref) {
      this.textboxRef = ref;
      if (this.props.withRef) {
        this.props.withRef(ref);
      }
    }
  };

  handleTextAreaBlur = (e: SyntheticEvent<HTMLInputElement>) => {
    const { setFocus } = this.props;
    const { value } = e.currentTarget;
    const newValue = value;

    this.setState({
      isEditing: false,
    }, () => {
      const {
        field,
      } = this.props;

      if (field.width && field.dataReference) {
        this.updateTextLines(newValue, field.dataReference, Number(field.width));
      }
      this.updating = false;
    });

    if (setFocus) {
      setFocus(false);
    }
  };

  activateEditing = (e: SyntheticEvent<HTMLInputElement>) => {
    this.updating = true;
    const {
      handleChange,
      value,
      docId,
      setFocus,
    } = this.props;
    const {
      name,
      type,
      checked,
    } = e.currentTarget;

    if (!handleChange) {
      return;
    }

    const newValue = Array.isArray(value) ? value.join(' ') : value;

    handleChange(newValue, docId, name, type, checked);
    this.updating = false;

    this.setState({
      isEditing: true,
    });
    if (setFocus) {
      setFocus(true);
    }
  }

  updateTextLines = (value: string, dataReference: number, width: number) => {
    const {
      handleChange,
      handleBlur,
      zoom,
      docId,
      theme,
      field,
    } = this.props;

    if (!handleChange) {
      return;
    }

    const lineHeightAdjusted = field.lineHeight ? field.lineHeight * zoom : DEFAULT_LINE_HEIGHT * zoom;
    const fontSizeAdjusted = field.fontSize ? field.fontSize * zoom : DEFAULT_FONT_SIZE * zoom;

    // Create DOM element for measuring lines
    const el = document.createElement('div');
    el.style.cssText = `outline:none;resize:none;line-height:${lineHeightAdjusted}px;
      font-size:${fontSizeAdjusted}px;font-family:${theme.typography.fontFamily};width:${(width - 2) * zoom}px;
      height:40px;overflow:auto;white-space:pre;margin:0;
      padding:0;border:0;visibility:hidden;`;
    if (document.body) {
      document.body.appendChild(el);
    }
    const newValue = value;

    /*
    1. Move forward over string, storing current position.
    2. When you reach a space, store position of that space.
    3. Add one letter at a time.
    4. When you get a scrollbar:
      i. if there was more than one word already on the line, go back to last space.
        Between last space and last 'progressIndex', add to 'lines' array.
        Set progressIndex to lastSpaceIndex.
      ii. If this is the only word on the line (lastSpaceIndex === progressIndex) and the word needs to break,
        add to lines array between progressIndex current spot minus 1.
        Set progressIndex to current spot minus 1, and lastSpaceIndex to the same.
    5. Continue moving forward over the string from step 1, repeat until string is done.
    */

    const lines = [];
    let progressIndex = 0;
    let lastSpaceIndex = 0;

    for (let i = 0; i < newValue.length; i += 1) {
      const char = newValue[i];
      if (char === ' ' && el.innerHTML === '') {
        progressIndex = i + 1;
        lastSpaceIndex = i;
        // Makes sense to use continue in this algorithm here, though discouraged by eslint.
        continue; // eslint-disable-line
      }
      el.innerHTML += char;
      if (char === ' ') {
        lastSpaceIndex = i;
      }
      if (el.clientWidth < el.scrollWidth) {
        el.innerHTML = '';
        if (lastSpaceIndex <= progressIndex) { // Indicates there is only one word on a line, and word needs to break.
          lines.push(newValue.slice(progressIndex, i));
          progressIndex = i;
          lastSpaceIndex = i;
          i -= 1;
        } else {
          lines.push(newValue.slice(progressIndex, lastSpaceIndex));
          progressIndex = lastSpaceIndex;
          lastSpaceIndex += 1;
          i = progressIndex - 1;
        }
      }
    }
    lines.push(newValue.slice(progressIndex));
    if (document.body) {
      document.body.removeChild(el);
    }

    handleChange(lines, docId, dataReference, FIELD_TYPES.TEXT, false);
    handleBlur(lines, docId, dataReference, { type: FIELD_TYPES.TEXT });
    this.updating = false;
  };

  getCursorPositionDifference =
    (newValue: string) => Math.abs(this.props.value.length - newValue.length);

  textboxRef: HTMLElement;

  render() {
    const {
      value,
      classes,
      zoom,
      dragging,
      onFocus,
      theme,
      field,
      mode,
      disabled,
    } = this.props;

    const { isEditing } = this.state;

    let fullValue = '';

    if (isEditing || dragging) {
      this.updating = true;
      fullValue = Array.isArray(value) ? value.join(' ') : value;
    } else if (this.updating) {
      fullValue = Array.isArray(value) ? value.join(' ') : value;
      this.evaluateBreaks(fullValue);
    } else {
      fullValue = Array.isArray(value) ? value.join('\n') : value;
    }

    const viewOnly = (mode === EDITOR_MODE.INSTANCE_VIEW) || (mode === EDITOR_MODE.TEMPLATE_PUBLISHED);
    const lineHeightAdjusted = field.lineHeight ? field.lineHeight * zoom : DEFAULT_LINE_HEIGHT * zoom;
    const fontSizeAdjusted = field.fontSize ? field.fontSize * zoom : DEFAULT_FONT_SIZE * zoom;

    return !isEditing && !dragging && !this.updating ? (
      <textarea
        key={`${field.id}-static`}
        value={fullValue}
        className={classNames(classes.textareaStatic, classes.textarea, {
          [classes.clickable]: !disabled && !viewOnly,
        })}
        name={field.dataReference}
        readOnly
        onClick={this.activateEditing}
        ref={this.textAreaRef}
        onKeyDown={this.handleKeys}
        style={{
          lineHeight: `${lineHeightAdjusted}px`,
          fontSize: fontSizeAdjusted,
          fontFamily: theme.typography.fontFamily,
          overflow: 'hidden',
          whiteSpace: 'pre',
        }}
        disabled={disabled}
      />
    ) : (
      <textarea
        key={`${field.id}-editing`}
        value={fullValue}
        // Autofocus should not normally be used, but this textarea is only rendered
        // when editing this field. Should not autofocus during resize/dragging.
        autoFocus={dragging ? false : true} // eslint-disable-line
        onChange={this.handleChange}
        className={classNames(classes.textareaLive, classes.textarea)}
        name={field.dataReference}
        onBlur={this.handleTextAreaBlur}
        ref={this.textAreaRef}
        onKeyDown={this.handleKeys}
        style={{
          lineHeight: `${lineHeightAdjusted}px`,
          fontSize: fontSizeAdjusted,
          overflow: 'hidden',
          fontFamily: theme.typography.fontFamily,
        }}
        disabled={disabled}
        onFocus={onFocus}
      />
    );
  }

}

export default compose(
  withTheme(),
  withStyles(styles, { withTheme: true }),
)(TextboxC);
