export default (theme: Object) => ({
  button: {
    borderRadius: '6px',
    padding: '0 30px',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    fontWeight: '500',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: theme.palette.semantic.hover,
    },
  },
  primary: {
    fontWeight: 400,
    color: theme.palette.neutrals.background,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.semantic.hover,
    },
    '&$disabled': {
      backgroundColor: theme.palette.neutrals.secondaryGrey,
    },
    boxShadow: 'none',
  },
  secondary: {
    fontWeight: 400,
    backgroundColor: theme.palette.neutrals.background,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.neutrals.background,
    },
    boxShadow: 'none',
    border: `1px solid ${theme.palette.primary.main}`,
  },
  disabled: {},
});
