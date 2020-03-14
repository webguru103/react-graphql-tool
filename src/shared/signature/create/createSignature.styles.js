export default (theme: Object) => ({
  root: {
    display: 'flex',
    width: '100%',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 610,
  },
  header: {
    fontSize: 23,
    fontWeight: 600,
    margin: '23px 0 17px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  tabButton: {
    width: 161,
    height: 32,
    borderRadius: 50,
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  activeTabButton: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
  },
  tabButtonIcon: {
    margin: 5,
  },
  tabButtonActive: {
    backgroundColor: theme.palette.primary.light,
  },
});
