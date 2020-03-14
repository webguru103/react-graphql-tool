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
  welcomeHeader: {
    color: theme.palette.neutrals.secondaryText,
    fontSize: '18px',
  },
  logo: {
    height: '19px',
    width: '72px',
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
