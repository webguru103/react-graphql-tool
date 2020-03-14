export default (theme: Object) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
    color: theme.palette.neutrals.mainText,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  legend: {
    fontSize: 10,
  },
});
