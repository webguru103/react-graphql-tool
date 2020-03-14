const styles = (theme: Object) => ({
  root: {
    padding: '32px 32px 42px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 500,
    color: theme.palette.neutrals.mainText,
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  error: {
    display: 'block',
    '&::first-letter': {
      textTransform: 'capitalize',
    },
  },
});

export default styles;
