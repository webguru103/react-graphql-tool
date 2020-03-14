import { ATTRIBUTE_PANEL_MIN_WIDTH } from './attributes.styles';

export default () => ({
  root: {
    overflow: 'scroll',
  },
  noSelection: {
    minWidth: ATTRIBUTE_PANEL_MIN_WIDTH,
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
