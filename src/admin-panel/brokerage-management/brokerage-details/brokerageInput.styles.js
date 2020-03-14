const styles = (theme: Object) => ({
  wrapperDiv: {
    '& > div': {
      marginBottom: '20px',
    },
  },
  toggle: {
    marginTop: 20,
    color: `${theme.palette.neutrals.mainText}`,
    '& p': {
      margin: 0,
    },
  },
  flexInputs: {
    display: 'flex',
  },
  flexInput: {
    padding: '0px 10px',
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
      borderColor: `${theme.palette.primary.main}`,
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
