import * as React from 'react';
import debounce from 'lodash.debounce';

import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';

import { LINE_MIN_STROKE_THICKNESS, LINE_MAX_STROKE_THICKNESS } from '../../constants';
import styles from './lineAttributes.styles';
import Attributes from './attributes';
import CollapsibleAttributeWrapper from './collapsibleAttributeWrapper';
import type { AdaptedLineField } from '../flowTypes';
import { adjustLineAttributesForPageSize } from '../utils';

type Props = {
  classes: Object,
  field: AdaptedLineField,
  handleLineFieldUpdate: Function,
  pageRef: HTMLDivElement,
  disabled: boolean,
  zoom: number,
  pageIndex: number,
};

type State = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  positionLock: boolean,
  strokeThickness: number,
};

export class LineAttributesC extends React.Component<Props, State> {

  state = {
    x1: this.props.field.x1 || 0,
    y1: this.props.field.y1 || 0,
    x2: this.props.field.x2 || 0,
    y2: this.props.field.y2 || 0,
    positionLock: this.props.field.positionLock || false,
    strokeThickness: this.props.field.strokeThickness || 1,
  };

  updateLineField = debounce((currentState: State) => {
    const { handleLineFieldUpdate, field, pageIndex } = this.props;
    const {
      x1,
      y1,
      x2,
      y2,
      positionLock,
      strokeThickness,
    } = currentState;

    const lineField = { ...field };

    if (!field.positionLock) {
      lineField.x1 = x1;
      lineField.y1 = y1;
      lineField.x2 = x2;
      lineField.y2 = y2;
    }
    lineField.positionLock = positionLock;
    lineField.strokeThickness = strokeThickness;
    handleLineFieldUpdate(
      field.id,
      lineField,
      pageIndex,
    );
  }, 50)

  componentDidUpdate(prevProps: Props) {
    const {
      field: {
        x1, y1, x2, y2, strokeThickness,
      },
    } = this.props;
    if (prevProps.field.x1 !== x1
      || prevProps.field.y1 !== y1
      || prevProps.field.x2 !== x2
      || prevProps.field.y2 !== y2
      || prevProps.field.strokeThickness !== strokeThickness
    ) {
      this.setState({
        x1: x1 || 0,
        y1: y1 || 0,
        x2: x2 || 0,
        y2: y2 || 0,
        strokeThickness: strokeThickness || prevProps.field.strokeThickness,
      });
    }
  }

  handleChangePositionSize = (field: string, forceParentUpdate?: boolean) => (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { pageRef, zoom } = this.props;
    const { positionLock, strokeThickness } = this.state;

    if (positionLock) {
      return;
    }

    const numberVal = e.target.value ? parseInt(e.target.value, 10) : 0;

    const update = {
      [field]: numberVal,
    };

    this.setState(update);

    const pageRect = pageRef.getBoundingClientRect();
    const adjusted = adjustLineAttributesForPageSize(pageRect.height / zoom, pageRect.width / zoom, update);

    if ((adjusted[field] === numberVal) || forceParentUpdate) {
      const adjustedUpdate = {
        [field]: adjusted[field],
      };
      this.setState(adjustedUpdate, () => {
        const currentState = {
          x1: this.state.x1,
          y1: this.state.y1,
          x2: this.state.x2,
          y2: this.state.y2,
          positionLock,
          strokeThickness,
        };
        this.updateLineField(currentState);
      });
    }
  };

  handleChangeStrokeThickness = (selection: {value: number, label: number}) => {
    const {
      x1,
      y1,
      x2,
      y2,
      positionLock,
    } = this.state;
    const numberVal = selection.value ? parseInt(selection.value, 10) : LINE_MIN_STROKE_THICKNESS;

    const currentState = {
      x1,
      y1,
      x2,
      y2,
      positionLock,
      strokeThickness: numberVal,
    };
    this.setState({ strokeThickness: numberVal }, () => this.updateLineField(currentState));
  };

  handlePositionLockToggle = () => {
    const update = {
      positionLock: !this.state.positionLock,
    };
    const {
      x1,
      y1,
      x2,
      y2,
      strokeThickness,
    } = this.state;

    const currentState = {
      x1,
      y1,
      x2,
      y2,
      positionLock: !this.state.positionLock,
      strokeThickness,
    };
    this.setState(update, () => this.updateLineField(currentState));
  };

  render() {
    const {
      classes, disabled, ...restProps
    } = this.props;
    const {
      x1,
      y1,
      x2,
      y2,
      positionLock,
      strokeThickness,
    } = this.state;

    return (
      <Attributes
        {...restProps}
        disabled={disabled}
        fieldName={this.props.field.fieldName}
        fieldType={this.props.field.type}
      >
        <React.Fragment>
          <CollapsibleAttributeWrapper attributeName="Position & Sizing">
            <div className={classes.section}>
              <div className={classes.sectionRow}>
                <FormLabel className={classes.formLabel}>Lock</FormLabel>
                <Checkbox
                  checked={positionLock}
                  onChange={this.handlePositionLockToggle}
                  value="updateFormBase"
                  name="updateFormBase"
                  disabled={disabled}
                />
              </div>
              <div className={classes.sectionRow}>
                <FormLabel className={classes.formLabel}>Vertex Point 1</FormLabel>
                <InputLabel classes={{ root: classes.inputLabel }}>x1</InputLabel>
                <Input
                  disabled={positionLock || disabled}
                  onChange={this.handleChangePositionSize('x1')}
                  onBlur={this.handleChangePositionSize('x1', true)}
                  classes={{ root: classes.input }}
                  value={x1.toString()}
                  type="number"
                  inputProps={{
                    'data-testid': 'line-attribute-x1-input',
                    min: 0,
                  }}
                />
                <InputLabel classes={{ root: classes.inputLabel }}>y1</InputLabel>
                <Input
                  disabled={positionLock || disabled}
                  onChange={this.handleChangePositionSize('y1')}
                  onBlur={this.handleChangePositionSize('y1', true)}
                  classes={{ root: classes.input }}
                  value={y1.toString()}
                  inputProps={{ min: 0 }}
                  type="number"
                />
              </div>
              <div className={classes.sectionRow}>
                <FormLabel className={classes.formLabel}>Vertex Point 2</FormLabel>
                <InputLabel classes={{ root: classes.inputLabel }}>x2</InputLabel>
                <Input
                  disabled={positionLock || disabled}
                  onChange={this.handleChangePositionSize('x2')}
                  onBlur={this.handleChangePositionSize('x2', true)}
                  classes={{ root: classes.input }}
                  value={x2.toString()}
                  inputProps={{ min: 0 }}
                  type="number"
                />
                <InputLabel classes={{ root: classes.inputLabel }}>y2</InputLabel>
                <Input
                  disabled={positionLock || disabled}
                  onChange={this.handleChangePositionSize('y2')}
                  onBlur={this.handleChangePositionSize('y2', true)}
                  classes={{ root: classes.input }}
                  value={y2.toString()}
                  inputProps={{ min: 0 }}
                  type="number"
                />
              </div>
            </div>
          </CollapsibleAttributeWrapper>
          <CollapsibleAttributeWrapper attributeName="Stroke Appearance">
            <div className={classes.section} data-testid="line-attribute-x2-input">
              <div className={classes.sectionRow}>
                <FormLabel classes={{ root: classes.formLabel }}>Thickness</FormLabel>
                <Select
                  className={classes.select}
                  value={{ value: strokeThickness, label: strokeThickness }}
                  autosize
                  onChange={this.handleChangeStrokeThickness}
                  options={[...Array(LINE_MAX_STROKE_THICKNESS).keys()].map(k => k + 1).map(thickness => ({ value: thickness, label: thickness }))}
                  isDisabled={disabled}
                />
              </div>
            </div>
          </CollapsibleAttributeWrapper>
        </React.Fragment>
      </Attributes>
    );
  }

}

export default withStyles(styles, { withTheme: true })(LineAttributesC);
