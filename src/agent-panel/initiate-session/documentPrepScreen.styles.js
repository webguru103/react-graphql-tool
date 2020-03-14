const styles = (theme: Object) => ({
  docPrepBody: {
    padding: '0px',
    margin: '0px auto',
    maxWidth: '724px',
  },
  docPrepTitle: {
    opacity: 0.5,
    fontSize: '16px',
    padding: '20px 0px',
    marginTop: '20px',
  },
  uploadFieldLabel: {
    fontSize: '12px',
  },
  fieldLabelWrapper: {
    width: '100%',
    padding: '10px 0px',
    borderBottom: `1px solid ${theme.palette.neutrals.mainAndButtonGrey}`,
    display: 'flex',
  },
  screenIcon: {
    opacity: '0.3',
    width: '15px',
    height: '15px',
    padding: '0px 10px',
  },
  viewContent: {
    minHeight: '262px',
  },
  view: {
    width: '100%',
    height: '100%',
    background: `${theme.palette.backgrounds.documentEditor}`,
  },
  card: {
    boxShadow: 'none',
    background: 'transparent',
    marginTop: '40px',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  errorIcon: {
    marginRight: '14px',
    color: theme.palette.semantic.error,
  },
});

export default styles;
