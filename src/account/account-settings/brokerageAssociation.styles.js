const styles = () => ({
  root: {},
  brokerageInfo: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flex: '1',
  },
  content: {
    display: 'flex',
    flex: '2',
  },
  label: {
    width: '200px',
  },
  body: {
    fontWeight: '500',
  },
  button: {
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export default styles;
