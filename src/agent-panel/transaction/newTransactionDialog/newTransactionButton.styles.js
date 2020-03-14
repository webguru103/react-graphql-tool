export default (theme: Object) => ({
  transactionButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.neutrals.background,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
});
