const styles = (theme: Object) => ({
  toggle: {
    marginTop: 20,
    color: `${theme.palette.neutrals.secondaryText}`,
    '& p': {
      margin: 0,
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
    color: `${theme.palette.neutrals.secondaryText}`,
    fontSize: 14,
    '&:focus': {
      borderColor: `${theme.palette.neutrals.secondaryText}`,
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
    color: `${theme.palette.neutrals.secondaryText}`,
    '& span': {
      color: `${theme.palette.neutrals.secondaryText}`,
    },
  },
});

export default styles;
