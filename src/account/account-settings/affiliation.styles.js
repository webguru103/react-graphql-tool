const styles = () => ({
  root: {
    position: 'relative',
  },
  content: {
    display: 'flex',
  },
  label: {
    width: '100px',
  },
  body: {
    fontWeight: '500',
  },
  button: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export default styles;
