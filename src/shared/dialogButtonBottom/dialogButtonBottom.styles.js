const styles = (theme: Object) => ({
  dialog: {
    minWidth: 500,
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 24px',
    borderBottom: `1px solid ${theme.palette.neutrals.greyUI}`,
    color: `${theme.palette.neutrals.mainText}`,
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
    textTransform: 'capitalize',
    '& + $dialogAction': {
      marginLeft: 15,
    },
  },
  dialogClose: {
    color: `${theme.palette.neutrals.mainText}`,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export default styles;
