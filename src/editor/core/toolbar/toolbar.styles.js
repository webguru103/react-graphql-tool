const styles = (theme: Object) => ({
  root: {
    left: 0,
    backgroundColor: theme.palette.neutrals.background,
    color: theme.palette.neutrals.mainText,
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    borderBottom: `1px solid ${theme.palette.neutrals.greyUI}`,
    zIndex: theme.zIndex.toolbar,
    alignItems: 'center',
  },
  withAppBar: {
    top: 60,
  },
  zoomIcons: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:nth-child(2)': {
      marginRight: 93,
    },
  },
  zoomIcon: {
    padding: 15,
    fontSize: 36,
    color: theme.palette.neutrals.mainText,
  },
  zoomIconDisabled: {
    color: theme.palette.neutrals.greyUI,
  },
  addFieldIcons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 55,
    outline: 'none',
    '& > *': {
      marginRight: 25,
    },
  },
  followField: {
    position: 'fixed',
    zIndex: theme.zIndex.activeItem,
  },
  signedCount: {
    marginLeft: 49,
    color: theme.palette.neutrals.secondaryText,
  },
  signJumpButtons: {
    textTransform: 'capitalize',
    fontSize: 15,
  },
  chevronArrows: {
    margin: '0 6px',
    display: 'inline-flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: '510px',
    height: '31px',
    width: '111px',
  },
  zoomViewIcons: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  downloadIcon: {
    marginRight: 11,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  loader: {
    color: theme.palette.primary.main,
  },
});

export default styles;
