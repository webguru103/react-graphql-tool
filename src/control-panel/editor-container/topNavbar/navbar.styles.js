const styles = (theme: Object) => ({
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    zIndex: theme.zIndex.appBar,
  },
  leftNav: {
    display: 'flex',
  },
  rightNav: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,
    '& > button': {
      marginLeft: 20,
    },
  },
  arrowBackButton: {
    width: 60,
    height: 60,
    borderRadius: 0,
    color: theme.palette.neutrals.background,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
  },
  transactionName: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    color: theme.palette.neutrals.secondaryText,
  },
});

export default styles;
