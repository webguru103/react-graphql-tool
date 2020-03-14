export default (theme: Object) => ({
  screenContainer: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    paddingTop: '32px',
    width: '365px',
  },
  errorWrapper: {
    margin: '0 0 30px',
  },
  helperText: {
    '&$errorMessage': {
      color: `${theme.palette.semantic.mainRed}`,
      fontSize: `${theme.typography.fontSize}`,
    },
  },
  errorMessage: {},
});
