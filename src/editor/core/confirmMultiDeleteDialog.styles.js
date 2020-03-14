export default (theme: Object) => ({
  dialogTitle: {
    fontSize: 23,
    fontWeight: 600,
    margin: '23px 0 17px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.neutrals.mainText,
  },
  dialogContent: {
    fontFamily: `${theme.typography.fontFamily}`,
    fontSize: 15,
  },
  dialogActions: {
    marginRight: 20,
    marginBottom: 18,
  },
  dialogAction: {
    margin: 0,
    textTransform: 'capitalize',
    '& + $dialogAction': {
      marginLeft: 15,
    },
  },
  actionButtons: {
    marginLeft: 20,
  },
});
