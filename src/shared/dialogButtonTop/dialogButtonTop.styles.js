const styles = (theme: Object) => ({
  dialog: {
    minWidth: 500,
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.neutrals.background,
    padding: '10px 24px',
    backgroundColor: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.neutrals.greyUI}`,
    fontSize: 16,
    fontWeight: 500,
    '& span': {
      flex: '1 0 0',
    },
  },
  dialogContent: {
    paddingTop: 24,
  },
  dialogActions: {
    margin: '20px 24px',
  },
  dialogAction: {
    margin: 0,
    boxShadow: 'none',
    color: theme.palette.neutrals.background,
    textTransform: 'capitalize',
    '& + $dialogAction': {
      marginLeft: 15,
    },
  },
  dialogClose: {
    color: `${theme.palette.neutrals.background}`,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export default styles;
