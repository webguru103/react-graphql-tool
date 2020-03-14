const styles = (theme: Object) => ({
  dialog: {
    minWidth: 500,
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 24px',
    fontSize: 16,
    fontWeight: 500,
    '& span': {
      flex: '1 0 0',
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
  flexInputs: {
    display: 'flex',
    marginTop: '20px',
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
    border: `1px solid ${theme.palette.secondary.light}`,
    borderRadius: 4,
    fontSize: 14,
    '&:focus': {
      borderColor: `${theme.palette.secondary.main}`,
    },
  },
  textFieldInputError: {
    '& $textFieldInput': {
      borderColor: '#f44336',
    },
  },
  textFieldLabel: {
    position: 'relative',
    transform: 'none',
    fontSize: 14,
  },
});

export default styles;
