export default () => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '116px',
    padding: '0 40px',
    '&:hover': {
      backgroundColor: '#f8f8f8',
      cursor: 'pointer',
    },
  },
  icon: {
    width: '45px',
    height: '45px',
  },
  number: {
    fontSize: '70px',
  },
  text: {
    textAlign: 'center',
  },
  textColumn: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
  },
});
