export default (theme: Object) => ({
  root: {
    backgroundColor: theme.palette.neutrals.background,
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row',
    justifyContent: 'space-between',
    height: '64px',
    padding: '0 50px',
    position: 'sticky',
  },
  logo: {
    height: '19px',
    width: '72px',
  },
  welcomeHeader: {
    color: theme.palette.neutrals.secondaryText,
    fontSize: '18px',
  },
  tabRoot: {
    color: theme.palette.neutrals.secondaryText,
    width: 'auto',
    minWidth: 0,
    marginLeft: '32px',
  },
  tabLabelContainer: {
    padding: 0,
  },
});
