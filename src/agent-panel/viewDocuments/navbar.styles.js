export default (theme: Object) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.neutrals.background,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-around',
    height: '60px',
    position: 'fixed',
    '&:after': {
      display: 'block',
      content: '""',
      height: 1,
      width: 'calc(100% - 38px)',
      margin: '0 19px',
      background: theme.palette.neutrals.secondaryGrey,
      position: 'absolute',
      top: 60,
    },
  },
  title: {
    color: theme.palette.neutrals.mainText,
    fontSize: 19,
    fontWeight: 600,
  },
});
