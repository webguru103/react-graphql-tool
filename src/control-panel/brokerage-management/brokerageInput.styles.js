const styles = (theme: Object) => ({
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 24px',
    borderBottom: `1px solid ${theme.palette.secondary.light}`,
    color: `${theme.palette.neutrals.mainText}`,
    fontSize: 16,
    fontWeight: 500,
    '& span': {
      flex: '1 0 0',
    },
  },
  dialogTitleButtonOnly: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '10px 24px 0',
    color: `${theme.palette.secondary.dark}`,
    fontSize: 16,
    fontWeight: 500,
  },
  dialogContent: {
    paddingTop: 24,
    '& > div': {
      marginBottom: '20px',
    },
  },
  dialogActions: {
    margin: '20px 24px',
  },
  dialogAction: {
    margin: 0,
    textTransform: 'capitalize',
    '& + $dialogAction': {
      marginLeft: 15,
    },
  },
  dialogClose: {
    color: `${theme.palette.secondary.dark}`,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  toggle: {
    marginTop: 20,
    color: `${theme.palette.secondary.main}`,
    '& p': {
      margin: 0,
    },
  },
  flexInputs: {
    display: 'flex',
  },
  flexInput: {
    padding: '0 10px',
    '&:first-of-type': {
      paddingLeft: 0,
    },
    '&:last-of-type': {
      paddingRight: 0,
    },
  },
  textFieldInputWrapper: {
    'label + &': {
      marginTop: '10px',
    },
  },
  textFieldInput: {
    padding: '10px 12px',
    border: `1px solid ${theme.palette.neutrals.greyUI}`,
    borderRadius: 4,
    color: `${theme.palette.neutrals.mainText}`,
    fontSize: 14,
    '&:focus': {
      borderColor: `${theme.palette.neutrals.mainText}`,
    },
  },
  textFieldInputError: {
    '& $textFieldInput': {
      borderColor: '#f44336',
    },
  },
  textFieldInputDisabled: {
    color: `${theme.palette.neutrals.secondaryText}`,
  },
  label: {
    color: `${theme.palette.neutrals.mainText}`,
    '& span': {
      color: `${theme.palette.neutrals.mainText}`,
    },
  },
  textFieldLabel: {
    position: 'relative',
    transform: 'none',
    fontSize: 14,
  },
  select: {
    width: '100%',
  },
});

export default styles;
