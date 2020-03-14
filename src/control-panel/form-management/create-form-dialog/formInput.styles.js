export default (theme: Object) => ({
  formInput: {
    display: 'flex',
    flexFlow: 'column',
    width: '550px',
  },
  textInput: {
    boxShadow: 'inset 0px 1px 3px 0px',
    paddingLeft: '5px',
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
  singleLabel: {
    margin: '20px 0 10px 0',
  },
  statusRadioGroup: {
    marginBottom: 20,
  },
  radio: {
    width: 30,
    height: 30,
  },
});
