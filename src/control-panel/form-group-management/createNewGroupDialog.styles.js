const styles = (theme: Object) => ({
  dialog: {
    minWidth: 500,
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 24px',
    color: `${theme.palette.neutrals.mainText}`,
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
  textFieldInputWrapper: {
    'label + &': {
      marginTop: '10px',
    },
  },
  textFieldInput: {
    padding: '10px 12px',
    border: `1px solid ${theme.palette.neutrals.mainAndButtonGrey}`,
    borderRadius: 4,
    color: `${theme.palette.neutrals.mainText}`,
    fontSize: 14,
    '&:focus': {
      borderColor: `${theme.palette.primary.main}`,
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
  label: {
    color: `${theme.palette.neutrals.mainText}`,
    '& span': {
      color: `${theme.palette.neutrals.mainText}`,
    },
  },
  radioControl: {
    marginTop: '20px',
  },
  radioGroup: {
    marginTop: '10px',
  },
  radio: {
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  errorMessage: {
    display: 'block',
    marginTop: '10px',
  },
});

export default styles;
