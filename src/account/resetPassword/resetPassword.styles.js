export default (theme: Object) => ({
  root: {
    display: 'flex',
    height: '100%',
    backgroundColor: theme.palette.neutrals.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    width: '290px',
  },
  screenTitle: ({
    fontSize: '26px',
    lineHeight: '1.15',
    color: theme.palette.neutrals.mainText,
    marginBottom: '30px',
  }),
  submitButton: {
    width: '100%',
    marginTop: '30px',
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
});
