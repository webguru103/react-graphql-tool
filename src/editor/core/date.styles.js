export default (theme: Object) => ({
  date: {
    display: 'flex',
    height: '100%',
    border: 'none',
    outline: 'none',
    resize: 'none',
    padding: 0,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    fontSize: '1em',
    fontFamily: theme.typography.fontFamily,
  },
  viewOnly: {
    backgroundColor: 'transparent',
    color: theme.palette.neutrals.mainText,
  },
});
