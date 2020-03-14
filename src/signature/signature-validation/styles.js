export default (theme: Object) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  screenContainer: {
    minWidth: '310px',
    backgroundColor: theme.palette.neutrals.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '2rem',
    borderRadius: '4px',
    boxShadow: '0px 0px 10px 2px #ab5fde',
  },
  screenTitle: ({
    fontSize: '14px',
    lineHeight: '1.15',
    color: '#fff',
    marginBottom: '30px',
  }),
  submitButton: {
    width: '100%',
    marginTop: '30px',
    marginBottom: '15px',
    display: 'flex',
  },
  errorLabel: {
    marginTop: '50px',
  },
  messageText: {
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '20px',
    color: theme.palette.neutrals.secondaryText,
  },
  buttonContainer: {
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'center',
  },
  errorMessage: {
    maxWidth: '310px',
    textAlign: 'center',
    color: '#ff0000',
  },
});
