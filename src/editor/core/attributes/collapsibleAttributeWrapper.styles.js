export default () => ({
  root: {
    marginBottom: -1,
    minHeight: 50,
    '&$expanded': {
      minHeight: 50,
    },
    padding: 0,
  },
  content: {
    '&$expanded': {
      margin: '12px 0px',
    },
  },
  expanded: {},
  expandIcon: {
    padding: 0,
  },
  panel: {
    overflow: 'hidden',
  },
  panelExpanded: {
    overflow: 'visible',
  },
  expansionPanelDetails: {
    padding: 0,
  },
  attributeName: {
    fontSize: 15,
    fontWeight: 600,
  },
});
