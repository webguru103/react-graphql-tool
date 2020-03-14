import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { DragSource } from 'react-dnd';
import { compose } from '../../../utility';
import SignatureIcon from '../../../assets/signature.svg';
import c from '../../constants';
import styles from './signature.styles';

export const signaturePreview = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAAAwCAYAAABHTnUeAAABDklEQV
R4Xu3TsQ0AMQzDQGf/ofN4IAiyA8+Na1Himpk9DoEogXUE+L9DoEZgE6BWubwvAQLYQ5oAAdL1C0
8AG0gTIEC6fuEJYANpAgRI1y88AWwgTYAA6fqFJ4ANpAkQIF2/8ASwgTQBAqTrF54ANpAmQIB0/c
ITwAbSBAiQrl94AthAmgAB0vULTwAbSBMgQLp+4QlgA2kCBEjXLzwBbCBNgADp+oUngA2kCRAgXb
/wBLCBNAECpOsXngA2kCZAgHT9whPABtIECJCuX3gC2ECaAAHS9QtPABtIEyBAun7hCWADaQIESN
cvPAFsIE2AAOn6hSeADaQJECBdv/AEsIE0AQKk6xf+CgAFAkkCH+XTXgE4MgoEAAAAAElFTkSuQm
CC`;

const signatureSource = {
  beginDrag(props) {
    const { id } = props;
    return { id };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
  };
}

type PropType = {
  connectDragPreview: Function,
  connectDragSource: Function,
  handleClick: Function,
  handleKeyDown: Function,
  classes: Object
}

class SignatureC extends React.PureComponent<PropType, *> {

  componentDidMount() {
    const preview = new Image();
    preview.src = signaturePreview;
    preview.onload = () => this.props.connectDragPreview && this.props.connectDragPreview(preview, { offsetX: 0, offsetY: 0 });
  }

  render() {
    const {
      connectDragSource, handleClick, classes, handleKeyDown,
    } = this.props;
    return ((
      connectDragSource && connectDragSource((
        <div
          role="button"
          tabIndex="0"
          onKeyDown={ev => handleKeyDown(ev, c.ItemTypes.SIGNATURE)}
          onClick={ev => handleClick(ev, c.ItemTypes.SIGNATURE)}
          className={classNames(classes.root, 'fieldOutClick')}
          data-testid="signatureTool"
        >
          <SignatureIcon className={classes.signatureFieldIcon} />
          <span className={classes.legend}>Signature</span>
        </div>
      ))
    ));
  }

}

export const Signature = compose(
  DragSource(c.ItemTypes.SIGNATURE, signatureSource, collect),
  withStyles(styles, { withTheme: true }),
)(SignatureC);
