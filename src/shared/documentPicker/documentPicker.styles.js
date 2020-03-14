const styles = (theme: Object) => ({
  documentPicker: {
    display: 'grid',
    padding: '20px',
    minWidth: '650px',
  },
  accordeonHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  filterInput: {
    border: `1px solid ${theme.palette.neutrals.greyUI}`,
    marginBottom: '30px',
  },
  expansionPanel: {
    boxShadow: 'none',
    borderTop: '0',
    borderBottom: `1px solid ${theme.palette.neutrals.greyUI}`,
    '&:before': {
      display: 'none',
    },
  },
  expansionPanelSummary: {
    alignItems: 'center',
  },
  expansionPanelDetails: {
    display: 'flex',
    flexFlow: 'column',
  },
  heading: {
    paddingLeft: '15px',
  },
});

export default styles;
