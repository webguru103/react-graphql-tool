export default (theme: Object) => ({
  checkbox: {
    display: 'flex',
    height: '100%',
    width: '100%',
    border: 'none',
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    padding: 0,
    alignSelf: 'center',
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clickable: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  iconWhite: {
    color: theme.palette.neutrals.background,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  uncheckedIcon: {
    width: '90%',
    height: '90%',
    borderRadius: 3,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.main,
    height: '90%',
    width: '90%',
    borderRadius: 3,
    border: `1px solid ${theme.palette.primary.main}`,
  },
});
