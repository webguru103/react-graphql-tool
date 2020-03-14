export default (theme: Object) => ({
  dialogTitle: {
    color: `${theme.palette.secondary.dark}`,
    fontFamily: `${theme.typography.fontFamily}`,
    fontSize: 21,
    fontWeight: 500,
  },
  dialogContent: {
    fontFamily: `${theme.typography.fontFamily}`,
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
});
