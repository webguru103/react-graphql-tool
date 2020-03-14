export default () => ({
  root: {
    gridColumn: 'span 2',
    padding: '15px',
    '&:hover': {
      backgroundColor: '#f8f8f8',
      cursor: 'pointer',
    },
  },
  header: {
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 'calc(100% - 30px)',
  },
  chart: {
    flexGrow: 1,
  },
  number: {
    margin: 0,
    fontSize: '70px',
  },
  text: {
    margin: 0,
    fontSize: '20px',
  },
  textColumn: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    width: '130px',
    top: '-40px',
  },
});
