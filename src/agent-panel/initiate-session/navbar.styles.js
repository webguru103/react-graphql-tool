export default (theme: Object) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.neutrals.background,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    height: '60px',
    position: 'sticky',
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
  logo: {
    marginLeft: '200px',
    height: '31px',
    width: '111px',
  },
  continue: {
    fontSize: '16px',
    marginRight: 30,
    width: 150,
  },
  back: {
    fontSize: '16px',
    marginLeft: 30,
    color: theme.palette.neutrals.mainText,
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  tabs: {
    height: '64px',
  },
  tabRoot: {
    color: theme.palette.primary.main,
    width: 'auto',
    minWidth: '130px',
    height: '100%',
    fontSize: '16px',
  },
  tabLabelContainer: {
    padding: 0,
  },
  tabIndicator: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    color: theme.palette.neutrals.mainText,
    fontSize: 19,
    fontWeight: 600,
    paddingLeft: '90px',
  },
  send: {
    marginRight: 8,
  },
});
