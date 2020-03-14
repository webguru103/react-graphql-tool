export default (theme: Object) => ({
  field: {
    boxSizing: 'border-box',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
    borderRadius: 2,
  },
  myField: {
    backgroundColor: theme.palette.secondary.light,
  },
  myStampField: {
    zIndex: theme.zIndex.stampField,
  },
  focused: {
    backgroundColor: 'transparent',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
});
