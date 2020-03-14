export default (theme: Object) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#ECEBF2',
  },
  dealtapLogo: {
    padding: '0.5rem 1rem',
    backgroundColor: '#B468DB',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  pageTitle: {
    fontSize: '14px',
    color: '#ffffff',
    marginLeft: '1rem',
  },
  content: {
    marginTop: '1rem',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0.5rem',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      marginTop: '0px',
    },
  },
});
