export default (theme: Object) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.neutrals.background,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    height: '60px',
    position: 'fixed',
    // fake element to help position the navbar title
    '&:before': {
      content: "''",
      visibility: 'hidden',
      background: '#ddd',
    },
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
    height: '31px',
    width: '111px',
    marginRight: '570px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    width: 150,
    position: 'relative',
  },
  buttonPulsing: {
    animation: 'shadow-pulse 1s infinite',
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
  '@keyframes shadow-pulse': {
    '0%': {
      boxShadow: '0 0 0 0px #8E57CF',
    },
    '100%': {
      boxShadow: '0 0 0 5px rgba(0, 0, 0, 0)',
    },
  },
});
