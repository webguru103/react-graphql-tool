export default (theme: Object) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.neutrals.background,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    height: '64px',
    padding: '0 32px 0 52px',
    position: 'sticky',
  },
  logo: {
    height: '21px',
    width: '74px',
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
});
