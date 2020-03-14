export default (theme: Object) => ({
  forgotPasswordC: {
    width: '400px',
  },
  title: {
    fontSize: '26px',
    color: theme.palette.neutrals.mainText,
    marginBottom: '15px',
  },
  subtitle: {
    marginBottom: '32px',
  },
  inputWrapper: {
    'label + &': {
      marginTop: '10px',
    },
  },
  input: {
    padding: '10px 12px',
    border: `1px solid ${theme.palette.neutrals.mainAndButtonGrey}`,
    borderRadius: 4,
    color: `${theme.palette.neutrals.mainText}`,
    fontSize: theme.typography.fontSize,
    '&:focus': {
      borderColor: `${theme.palette.primary.main}`,
    },
  },
  inputError: {
    '& $input': {
      borderColor: '#f44336',
    },
  },
  label: {
    position: 'relative',
    transform: 'none',
    fontSize: theme.typography.fontSize,
    color: `${theme.palette.neutrals.mainText}`,
    '& span': {
      color: `${theme.palette.neutrals.mainText}`,
    },
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: '32px',
  },
  button: {
    marginLeft: '10px',
  },
  networkErrorWrapper: {
    marginTop: '10px',
  },
  helperText: {
    '&$networkErrorMessage': {
      color: `${theme.palette.semantic.mainRed}`,
      fontSize: `${theme.typography.fontSize}`,
    },
  },
  networkErrorMessage: {
    fontFamily: `${theme.typography.fontFamily}`,
  },
});
