import * as React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import classNames from 'classnames';
import textToSvg from 'text-to-svg';
import FontTab from './fontTab';
import DrawTab from './drawTab';
import { STATIC_SERVER } from '../../../configurations';
import { logger } from '../../../logger';
import styles from './createSignature.styles';
import KeyboardImage from '../../../assets/keyboard.svg';
import DrawImage from '../../../assets/pen.svg';

type Props = {
  onSubmit: ({ signature: string, initials: string }) => void | Promise<void>,
  onClose: () => void,
  fullName: string,
  classes: Object,
};

class CreateSignatureC extends React.PureComponent<Props, { tab: number }> {

  state = {
    tab: 1,
  };

  handleTabSwitch = value => () => {
    this.setState({
      tab: value,
    });
  };

  handleSubmit = async ({ signature, initials, fontOption }: { signature: string, initials: string, fontOption: string } = {}) => {
    if (this.state.tab === 0) {
      const options = {
        x: 0, y: 0, fontSize: 25, anchor: 'top left',
      };
      const casedFontOption = fontOption.split('_').join('');

      const getSvg = text => new Promise((res) => {
        textToSvg.load(`${STATIC_SERVER}/assets/fonts/${casedFontOption}-Regular.ttf`, (err, text2svg) => {
          logger.log(err);
          const svg = text2svg.getSVG(text, options);
          res(svg);
        });
      });

      const signatureSVG = await getSvg(signature);
      const initialsSVG = await getSvg(initials);
      this.props.onSubmit({
        signature: `data:image/svg+xml;base64,${btoa(signatureSVG)}`,
        initials: `data:image/svg+xml;base64,${btoa(initialsSVG)}`,
      });
    }

    if (this.state.tab === 1) {
      this.props.onSubmit({
        signature,
        initials,
      });
    }
  };

  render() {
    const { tab } = this.state;
    const {
      onClose, fullName, classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <div className={classes.header}>Create Your Stamps</div>
          <div className={classes.tabButtonContainer}>
            <div
              onKeyDown={this.handleTabSwitch(0)}
              onClick={this.handleTabSwitch(0)}
              tabIndex={0}
              role="button"
              className={classNames({
                [classes.activeTabButton]: tab === 0,
                [classes.tabButton]: true,
              })}
            >
              <KeyboardImage className={classes.tabButtonIcon} />
              Type
            </div>
            <div
              onKeyDown={this.handleTabSwitch(1)}
              onClick={this.handleTabSwitch(1)}
              tabIndex={0}
              role="button"
              className={classNames({
                [classes.activeTabButton]: tab === 1,
                [classes.tabButton]: true,
              })}
            >
              <DrawImage className={classes.tabButtonIcon} />
              Draw
            </div>
          </div>
        </div>
        {tab === 0
          && (
          <FontTab
            signature={fullName}
            initials={fullName.split(' ').map(w => w.slice(0, 1).toUpperCase()).join('')}
            onSubmit={this.handleSubmit}
            onClose={onClose}
          />
          )
        }
        {tab === 1
          && (
          <DrawTab
            onSubmit={this.handleSubmit}
            onClose={onClose}
          />
          )
        }
      </div>
    );
  }

}

export default withStyles(styles)(CreateSignatureC);
