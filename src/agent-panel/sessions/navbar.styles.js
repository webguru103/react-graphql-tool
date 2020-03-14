export default (theme: Object) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.neutrals.background,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    height: '64px',
    padding: '0 15%',
    position: 'sticky',
  },
  logo: {
    height: '31px',
    width: '111px',
  },
  title: {
    color: theme.palette.neutrals.mainText,
    fontSize: 19,
    paddingLeft: '60px',
  },
  button: {
    color: 'white',
  },
  startSigningIcon: {
    paddingRight: '5px',
  },
});
